import {Sequelize} from 'sequelize';

/** Code based on https://sequelize.org/master/manual/getting-started.html **/

class DBConnector {
  static sequelize

  private setConnection() {
    DBConnector.sequelize = new Sequelize(process.env.DB_CONNECTION, {
      dialect: 'postgres',
      logging: (...msg) => console.log(msg)   // Displays all log function call parameters
    });
  }

  private testConnection() {
    return new Promise((resolve, reject) => {
      DBConnector.sequelize.authenticate({msg: '🔎 🔎 🔎 🔎 🔎 🔎 🔎 🔎    Testing DB connection    🔎 🔎 🔎 🔎 🔎 🔎 🔎 🔎'})
        .then((res: any) => resolve('success'))
        .catch((error: any) => reject(error));
    })
  }

  public connect = () => {
    return new Promise((resolve, reject) => {
      this.setConnection();
      this.testConnection().then((res: string) => resolve(res)).catch((error: any) => reject(error));
    })
  }
}

export default DBConnector;
