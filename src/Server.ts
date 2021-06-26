import express from 'express';
import bodyParser from 'body-parser';
import tasksRouter from './routers/TasksRouter';

/** Code based on https://github.com/CyberZujo/todo-app **/

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json({limit: '1mb'})); // 100kb default
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
