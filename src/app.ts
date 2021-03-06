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
      console.log('\n\nš š š š š š š š    DB connected    š š š š š š š š\n\n');

// Step 2. SERVER start
      new Server().start()
        .then((port: unknown) => {
          console.log(`\n\nš š š š š š š š    SERVER running on port ${port}    š š š š š š š š\n\n`);
        })
        .catch((error: Error) => {
          console.error('\n\nā ā ā ā ā ā ā ā    Unable to establish server:', error, '    ā ā ā ā ā ā ā ā\n\n');
          DBConnector.sequelize.close();
          throw error;
        });
    })
    .catch((error: Error) => {
      console.error('\n\nā ā ā ā ā ā ā ā    Unable to connect to the DB:', error, '    ā ā ā ā ā ā ā ā\n\n');
      throw error;
    });

export default starter;
