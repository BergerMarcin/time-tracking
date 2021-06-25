import {config} from "dotenv-flow";
import express, {Application, Router} from 'express';
import bodyParser from 'body-parser';
import tasksRouter from './routers/TasksRouter';
import DBConnector from './dbconfig/DBConnector';

// import configuredPool from './dbconfig/dbconnector';

class Server {
  private app;

  constructor() {
    this.setEnvs();
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private setEnvs() {
    // process.env.NODE_ENV should be set @ package.json
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    console.log('Starting directory for process.env: ' + process.cwd());
    // process envs from .env.* files
    const result = config();
    console.log('parsed process.env from .env files: ', result)
    if (result.error) throw result.error
  }

  private config() {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json({limit: '1mb'})); // 100kb default
  }

  private dbConnect() {
    new DBConnector().connect()
      .then((res: string) => console.log('\n\n👍 👍 👍 👍 👍 👍 👍 👍    DB connected    👍 👍 👍 👍 👍 👍 👍 👍\n\n'))
      .catch((error: any) => {
        console.error('\n\n⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔    Unable to connect to the DB:', error, '    ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔\n\n');
        throw error;
      })
    // configuredPool().connect(function (err, client, done) {
    //   if (err) throw new Error(err);
    //   console.log(`!!! SUCCESS !!!    DB "${process.env.DB_DATABASE}" connected    !!! SUCCESS !!!`);
    // });
  }

  private routerConfig() {
    this.app.use('/', tasksRouter);
  }

  public start = () => {
    let port: number;
    try {
      port = parseInt(process.env.API_PORT);
    } catch (err) {
      throw err;
    }
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      }).on('error', (err: Object) => reject(err));
    })
  }
}

export default Server;
