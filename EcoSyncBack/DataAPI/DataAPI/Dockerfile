# base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 as base
WORKDIR /App

# build : build the project
FROM base as build

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out --no-restore

# final image
FROM base as final
WORKDIR /App

COPY --from=build /App/out ./out/

EXPOSE 5000

ENTRYPOINT ["dotnet", "./out/DataAPI.dll"]
