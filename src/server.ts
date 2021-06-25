import {config} from "dotenv-flow";
import express from 'express';
import bodyParser from 'body-parser';
import DBConnector from './dbconfig/DBConnector';
import {Task, taskModelInit} from './models/TaskModel';
import tasksRouter from './routers/TasksRouter';

/** Code based on https://github.com/CyberZujo/todo-app **/

class Server {
  private app;

  constructor() {
    this.setEnvs();
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
    this.initModels();
  }

  private setEnvs() {
    console.log('\n\n🔧 🔧 🔧 🔧 🔧 🔧 🔧    Setting process.envs from .env.* files    🔧 🔧 🔧 🔧 🔧 🔧 🔧');
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
      .then(() => {
        console.log('\n\n👍 👍 👍 👍 👍 👍 👍 👍    DB connected    👍 👍 👍 👍 👍 👍 👍 👍\n\n');
      })
      .catch((error: Error) => {
        console.error('\n\n⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔    Unable to connect to the DB:', error, '    ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔\n\n');
        throw error;
      });
  }

  private initModels() {
    taskModelInit(DBConnector.sequelize);
  }

  private routerConfig() {
    this.app.use('/', tasksRouter);
  }

  public start = () => {
    let port: number;
    try {
      port = parseInt(process.env.API_PORT || '');
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
