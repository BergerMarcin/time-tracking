# API for Tasks Time Tracker

## Intro
Based on article
["Building and running a Node.JS, TypeScript, PostgreSQL app with Docker"](https://medium.com/nsoft/building-and-running-nodejs-typescript-postgresql-application-with-docker-3878240a2f73)
of Haris Zujo and [related repo](https://github.com/CyberZujo/todo-app)


# API documentation

> TimeZone
> 
> In order to avoid timezone changes issues, DB date-time data are timestamps with timezone
> Moreover DB operates on set timezone (and internally recalculated date-time to set timezone)
>
> API returns response with date-times acc. set timezone in format `YYYY-MM-DD HH:mm`.
> 
> Therefore ***timezone is request parameters*** of all requests as 'Continent/City' (available list acc. `moment.tz.names()` of `moment-timezone` package)
> 
> It is recommended at requests to use ***browser timezone*** taken with: `Intl.DateTimeFormat().resolvedOptions().timeZone;`

# Install
## DB PostgreSQL

## Node, TS, Docker, etc.


# Run
Running our application services with Docker
```sh
docker-compose up --build -d
```


# Settings
> NODE_ENV should be set @ package.json (otherwise it will be set to `development`)

> Use .env.* files to set credentials depending on environment