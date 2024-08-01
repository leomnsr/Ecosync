# EcoSync Backend documentation

## Build

To build the project you must have a valid prod.env and/or dev.env (the manual build is using the dev version while docker is using the prod) file in the directory `EcoSyncBack`:

```sh
# JWT conf
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
JWT_ISSUER=issuer
JWT_AUDIENCE=audience

# postgres conf
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db

# apis conf
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### Manual

#### dependencies

- dotnet 8.0 or higher
- bun 1.1 or higher
- docker & docker-compose

#### build

- In the `EcoSyncBack/CalculationApi` directory run:

```sh
$ bun install && bun --env-file="../dev.env" run start
```
- In the `EcoSyncBack/DataApi/DataApi` directory run:

```sh
$ dotnet run
```

- In the `EcoSyncBack/postgres` directory run:

```sh
$ docker-compose up
```

Check the output on your terminal to see where the servers are running.

### Docker

To run the docket-compose you must have a valid .env file in the directory `EcoSyncBack`:

```sh
POSTGRES_PORT=5432
NGINX_PORT=8000
```

it will configure the exposed ports for the services.


In the `EcoSyncBack` directory run:

```sh
$ ./start.sh
```

Check the help for the script to see the available options:

```sh
$ ./start.sh -h
# or
$ ./start.sh --help
```

The servers will be running on the port defined in the .env file.

You can access the swagger documentation on `http://localhost:${NGINX_PORT}/api/data` and `http://localhost:${NGINX_PORT}/api/calculation`
