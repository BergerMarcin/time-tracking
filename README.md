# API for Tasks Time Tracker

## Intro
Based on article
["Building and running a Node.JS, TypeScript, PostgreSQL app with Docker"](https://medium.com/nsoft/building-and-running-nodejs-typescript-postgresql-application-with-docker-3878240a2f73)
of Haris Zujo and [related repo](https://github.com/CyberZujo/todo-app)


# API documentation


> TimeZone
> API (& DB) delivers UTC date time

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
Simple SQL

## Node.js
According recruitment list I apply for Node.js so choice is obvious
I am using Node.js v.12.22.1 LTS

## Express.js
Simple API, simple framework. Latest version

## Packages
### dotenv-flow
Deliver proper process.env acc. NODE_ENV set in scripts of package.json

### pg
Simple, non-blocking PostgreSQL client for Node.js (Driver)

### sequelize
ORM based on `pg` package. <br/> 
Universal due to: applicable for many SQLs, for TS, allows to use raw SQL queries (in most cases the best performance)

## Docker
I am used to use it but I will use it later on as slow down compilation 

# Design patterns
ORM with sequelize <br/>
MVC with Express.js (but without View as backend app) <br/>

# Developing issues
## Connect DB - unavailable process.envs - JS set objects first before functions running 
Unfortunately I could not connect DB informing me that marcin (me as a Linux user) try to connect DB although I set proper process.env <br/>
I found out that configuredPool (which was that time simple object) @ DBConnector.ts has no proper process.envs. 
I mean configuredPool (as a simple object) had been set before process.envs was set (process.envs was set more sophisticated by using class function setEnvs @ Server.ts) <br/>
I solved that issue with changing configuredPool to function (which is called acc code flow so after process.envs setting)<br/>
That was good lesson of how TS is transpiled and JS is running with simple object and classes 

## Controller - unavailable class properties at passed class functions
I am used to set queries in one place (good code practise, cleaner code, allows applying more generic queries and routing) <br/> 
For some reason at controller class (TasksController) private properties could not be reached at that class function (of course I use `this`)
I mean when I pass on controller function of that class to the Express router it has no access to class private properties <br/>
I solved that by creating static properties accessible @ router

## Date timezone and format
Responsibility of changing date time acc. timezone and format moved to frontend (on stage 4. of app developing - [see app developing plan](#app))

## Unavailable result type of raw SQL query @ sequelize
Using raw SQL query @ sequelize concludes no type of results, so TS could be not applied <br/>
That means model querying should be implemented but not implemented due to time limitation. Just added to the plan

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
6. Auto tests
7. Implement model querying of sequelize (instead of raw SQL query)
8. Dockerise
9. Deployment
10. CI auto tests

## Documentation
1. Continuous develop app's Readme.md
2. Describe tools more details
3. Create Swagger API documentation

## Today status:
DB: DONE! :) <br/>
App: p.1-3 DONE! <br/>
DOCS: p.1-2 ONGOING <br/>
