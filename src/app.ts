import setEnvs from "./setenvs";
import Server from './Server';
import DBConnector from "./DBConnector";

/** Code based on https://github.com/CyberZujo/todo-app **/

// Set process.env
setEnvs();

// Connect DB, start SERVER
const starter: Promise<void> =

// Step 1. DB connection
  new DBConnector().connect()
    .then(() => {
      console.log('\n\n👍 👍 👍 👍 👍 👍 👍 👍    DB connected    👍 👍 👍 👍 👍 👍 👍 👍\n\n');

// Step 2. SERVER start
      new Server().start()
        .then((port: unknown) => {
          console.log(`\n\n👍 👍 👍 👍 👍 👍 👍 👍    SERVER running on port ${port}    👍 👍 👍 👍 👍 👍 👍 👍\n\n`);
        })
        .catch((error: Error) => {
          console.error('\n\n⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔    Unable to establish server:', error, '    ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔\n\n');
          DBConnector.sequelize.close();
          throw error;
        });
    })
    .catch((error: Error) => {
      console.error('\n\n⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔    Unable to connect to the DB:', error, '    ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔\n\n');
      throw error;
    });

export default starter;
