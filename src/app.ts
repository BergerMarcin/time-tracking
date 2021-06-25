import server from './server';

// Set process.envs, connect DB, set routing, start server
const starter = new server().start()
  .then(port => console.log(`\n\n👍 👍 👍 👍 👍 👍 👍 👍    SERVER running on port ${port}    👍 👍 👍 👍 👍 👍 👍 👍\n\n`))
  .catch(error => {
    console.error('\n\n⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔    Unable to establish server:', error, '    ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔\n\n');
  });

export default starter;
