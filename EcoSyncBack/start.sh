#!/bin/bash
# Here are some suggestions to improve the script:
#
# 4. **Logging:** Consider adding logging to a file in addition to or instead of printing to the console. This can be helpful for troubleshooting issues later.
#
# 6. **Use functions for command execution:** Instead of directly executing commands like `docker-compose up`, consider wrapping them in functions. This will allow you to handle errors and logging in a consistent way.
#
# 9. **Support for more Docker Compose commands:** The script currently supports building, starting, and restarting containers. It could be extended to support other Docker Compose commands like stop, remove, logs, etc.

RETVAL=0

DATA_SRC_DIR="./DataAPI/DataAPI"
CALC_SRC_DIR="./CalculationAPI"
BUILD_CACHE_DIR="./.build_cache"

FOREGROUND=false
FORCE_BUILD=false
RESTART=false
SERVICES=false
SERVICES_LIST="nginx postgres data-api calculation-api"
VERBOSE=false
HELP=false

print() {
	GREEN='\033[0;32m'
	NC='\033[0m'
	if [ "$VERBOSE" = true ]; then
		echo -e "${GREEN}$@${NC}"
	fi
}

print_command() {
	YELLOW='\033[1;33m'
	NC='\033[0m'
	if [ "$VERBOSE" = true ]; then
		echo -e "${YELLOW}$@${NC}"
	fi
}

print_error() {
	RED='\033[0;31m'
	NC='\033[0m'
	echo -e "${RED}$@${NC}"
}

print_help() {
	echo "Usage: start.sh [options]"
	echo "Options:"
	echo "  -f, --foreground		Run the container in the foreground"
	echo "  --force-build			Force the build of the containers"
	echo "  -s, --services <services>	Specify the services to start or restart. Default services are: $SERVICES_LIST"
	echo "				Example: -s data-api,calculation-api"
	echo "  -r, --restart			Restart the containers for the specified services"
	echo "  -v, --verbose			Verbose output"
	echo "  -h, --help			Display this help message"
}

check_dependencies() {
	if ! command -v docker &> /dev/null; then
		print_error "docker command not found. Please install Docker."
		exit 1
	fi

	if ! command -v docker-compose &> /dev/null; then
		print_error "docker-compose command not found. Please install Docker Compose."
		exit 1
	fi
}

parse_args() {
	tmp_service_list=""

	while (( "$#" )); do
		case "$1" in
			-f|--foreground)
				FOREGROUND=true
				shift
				;;
			-r|--restart)
				RESTART=true
				shift
				;;
			-v|--verbose)
				VERBOSE=true
				shift
				;;
			-h|--help)
				HELP=true
				shift
				;;
			-s|--services)
				tmp_service_list="$2"
				SERVICES=true
				shift 2
				;;
			--force-build)
				FORCE_BUILD=true
				shift
				;;
			*)
				echo "Invalid option: $1"
				HELP=true
				RETVAL=1
				shift
				;;
		esac
	done

	if [ "$SERVICES" = true ]; then
		SERVICES_LIST=$(echo $tmp_service_list | tr "," " ")
	fi
}
get_src_dir_from_service() {
	case $1 in
		data-api )
			echo $DATA_SRC_DIR
			;;
		calculation-api )
			echo $CALC_SRC_DIR
			;;
		* )
			print_error "Invalid service: $1"
			exit 1
			;;
	esac
}

get_image_name_from_service() {
	if [[ "$OSTYPE" == "darwin"* ]]; then
		separator="-"
	else
		separator="_"
	fi
	case $1 in
		data-api )
			echo "ecosyncback${separator}data-api"
			;;
		calculation-api )
			echo "ecosyncback${separator}calculation-api"
			;;
		* )
			print_error "Invalid service: $1"
			exit 1
			;;
	esac
}

save_build_time() {
	SERVICE=$1
	if [ ! -d "$BUILD_CACHE_DIR" ]; then
		mkdir -p $BUILD_CACHE_DIR
	fi

	if [ -z "$SERVICE" ]; then
		print_error "Service name is required"
		exit 1
	fi

	if [ "$SERVICE" = "nginx" ] || [ "$SERVICE" = "postgres" ]; then
		print "Skipping $SERVICE"
		return
	fi

	echo $(date +%s) > $BUILD_CACHE_DIR/$SERVICE
}

build() {
	print "Building the container(s) $@"

	for service in $@; do
		print_command "docker-compose build $service"
		if [ "$VERBOSE" = true ]; then
			docker-compose build $service
			RETVAL=$?
		else
			docker-compose build $service > /dev/null
			RETVAL=$?
		fi

		if [ $RETVAL -ne 0 ]; then
			if [ "$VERBOSE" = false ]; then
				print_error "Failed to build the containers re-run the script with -v option for more details"
			fi
			exit $RETVAL
		fi

		save_build_time $service
	done

}

smart_build() {
	print "Building the containers"

	for service in $SERVICES_LIST; do
		if [ "$service" = "nginx" ] || [ "$service" = "postgres" ]; then
			print "Skipping $service"
			continue
		fi

		SRC_DIR=$(get_src_dir_from_service $service)
		IMAGE_NAME=$(get_image_name_from_service $service)

		if [[ "$OSTYPE" == "darwin"* ]]; then
			LAST_MODIFICATION=$(find $SRC_DIR -type f -exec stat -f %m {} \; | sort -nr | head -n 1)
		else
			LAST_MODIFICATION=$(find $SRC_DIR -type f -exec stat -c %Y {} \; | sort -nr | head -n 1)
		fi

		IMAGE_UPDATE=$(cat $BUILD_CACHE_DIR/$service 2> /dev/null)

		if [ -z "$IMAGE_UPDATE" ] || [ "$LAST_MODIFICATION" -gt "$IMAGE_UPDATE" ]; then
			build $service
		else
			print "No changes detected in $service, skipping build"
		fi

	done
}

restart() {
	print "Restarting the containers for the following services: $SERVICES_LIST"
	print_command "docker-compose restart $SERVICES_LIST"
	docker-compose restart $SERVICES_LIST
	exit $?
}

start() {
	print "Starting the containers"
	COMMAND="docker-compose up"
	if [ "$FOREGROUND" = false ]; then
		COMMAND="$COMMAND -d"
	fi

	print_command "$COMMAND"

	$COMMAND $SERVICES_LIST
	RETVAL=$?

	if [ $RETVAL -ne 0 ] && [ $RETVAL -ne 130 ]; then
		print_error "Failed to start the containers"
		exit $RETVAL
	fi
}

parse_args $@

if [ "$HELP" = true ]; then
	print_help
	exit $RETVAL
fi

if [ "$RETVAL" -ne 0 ]; then
	exit $RETVAL
fi

if [ "$RESTART" = true ]; then
	restart
fi

if [ "$FORCE_BUILD" = true ]; then
	build $SERVICES_LIST
else
	smart_build
fi

start
