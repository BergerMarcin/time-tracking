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

<br/><hr/><hr/><hr/>

# Stack
## PostgreSQL
I use it last time 1.5 year ago but let's see

## Node.js
According recruitment list I apply for Node.js so choice is obvious
I am using Node.js v.12.22.1 LTS

## Express.js
Simple API, simple framework. Latest version

## Packages
### dotenv-flow
I rely on it and I am sure I have proper .envs acc. NODE_ENV set in scripts of package.json

### pg
Simple, non-blocking PostgreSQL client for Node.js

### moment-timezone
Old good package to solve issues with timezones

## Docker
I am used to use it but I will use it later on as slow down compilation 

# Design patterns
ORM with sequelize <br/>
MVC with Express.js (but without View as backend app) <br/>

# Developing issues
## Connect DB - unavailable process.envs - JS set objects first before functions running 
Unfortunately I could not connect DB informing me that marcin (me as a Linux user) try to connect DB although I set proper process.env <br/>
I found out that configuredPool (which was that time simple object) @ dbconnector.ts has no proper process.envs. 
I mean configuredPool (as a simple object) had been set before process.envs was set (process.envs was set more sophisticated by using class function setEnvs @ server.ts) <br/>
I solved that issue with changing configuredPool to function (which is called acc code flow so after process.envs setting)<br/>
That was good lesson of how TS is transpiled and JS is running with simple object and classes 

## Controller - unavailable class properties at passed class functions
I am used to set queries in one place (good code practise, cleaner code, allows applying more generic queries and routing) <br/> 
For some reason at controller class (TasksController) private properties could not be reached at that class function (of course I use `this`)
I mean when I pass on controller function of that class to the Express router it has no access to class private properties <br/>
I solved that by creating static properties accessible @ router

<br/><hr/><hr/><hr/>

# Developing plan
## DB
1. Create SQL tables schema (table)
2. Prepare PostgreSQL base
3. Create fixtures
4. Prepare queries with optimisation
5. Solve issue with timezones

## App   
1. Find and take similar solution -> found with .env load issue, no ORM
2. Basic adapting before start it up (+ adding console logs to see in terminal what's up for debugging purposes):   
   a. apply local start-up with nodemon
   b. add .env loading
   c. connect DB
   d. add proper queries in general way
   e. add proper routing
3. Start it up locally & test manual
4. Add ORM
5. Develop routing and make queries more general (to make it DRY)
6. Tests 
7. Dockerise
8. Deployment

## Documentation
1. Continuous develop app's Readme.md
2. Describe tools more details
3. Create Swagger API documentation

## Today status:
DB: DONE! :) <br/>
App: p.1-3 DONE! <br/>
DOCS: p.1-2 ONGOING <br/>
