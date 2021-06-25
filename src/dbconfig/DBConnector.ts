import {Sequelize} from 'sequelize';
import {Task} from "../models/TaskModel";

/** Code based on https://sequelize.org/master/manual/getting-started.html **/

class DBConnector {
  public static sequelize: Sequelize;

  private setConnection() {
    DBConnector.sequelize = new Sequelize(process.env.DB_CONNECTION || '', {  // `|| ''` solving TS issue with inaccessible proces.env
      dialect: 'postgres',
      logging: (...msg) => console.log(msg)   // Displays all log function call parameters
    });
  }

  private testConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      // @ts-ignore: not standard msg option - logging msg added @ object sequelize invoking (see DBConnector.setConnection)
      DBConnector.sequelize.authenticate({msg: '🔎 🔎 🔎 🔎 🔎 🔎 🔎 🔎    Testing DB connection    🔎 🔎 🔎 🔎 🔎 🔎 🔎 🔎'})
        .then(() => resolve())
        .catch((error: Error) => reject(error));
    })
  }

  private createTableIfNotExists():Promise<void> {
    return new Promise((resolve, reject) => {
      // Creates the table if it doesn't exist (and does nothing if it already exists)
      // @ts-ignore: not standard msg option - logging msg added @ object sequelize invoking (see DBConnector.setConnection)
      Task.sync({msg: '🔎 🔎 🔎 🔎 🔎 🔎 🔎 🔎    Creating "task" table if not exeists    🔎 🔎 🔎 🔎 🔎 🔎 🔎 🔎'})
        .then(() => resolve())
        .catch((error: Error) => reject(error));
    })
  }

  public connect (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.setConnection();
      this.testConnection().then(() => {
        this.createTableIfNotExists().then(() => resolve()).catch((error: Error) => reject(error));
      }).catch((error: Error) => reject(error));
    })
  }
}

export default DBConnector;
