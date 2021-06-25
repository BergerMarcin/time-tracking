// import {Pool} from 'pg';
//
// // NOTE: Below must be function (instead of object) to avoid set/construct/call it before
// //       process.envs is set with dotenv-flow package @ server.ts
// const configuredPool = () => {
//   return new Pool({
//     connectionString: process.env.DB_CONNECTION,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   })
// };
//
// export default configuredPool;

import {Sequelize} from 'sequelize';

class DBConnector {
  static sequelize

  private setConnection() {
    DBConnector.sequelize = new Sequelize(process.env.DB_CONNECTION, {
      dialect: 'postgres',
      logging: (...msg) => console.log(msg)
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
