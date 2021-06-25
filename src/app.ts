import Server from './server';

/** Code based on https://github.com/CyberZujo/todo-app **/

// Set process.envs, connect DB, set routing, start server
const starter: Promise<void> = new Server().start()
  .then((port: unknown) => {
    console.log(`\n\n👍 👍 👍 👍 👍 👍 👍 👍    SERVER running on port ${port}    👍 👍 👍 👍 👍 👍 👍 👍\n\n`);
  })
  .catch((error: string) => {
    console.error('\n\n⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔    Unable to establish server:', error, '    ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔\n\n');
  });

export default starter;
