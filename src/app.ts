import server from './server';

// Set process.envs, connect DB, set routing, start server
const starter = new server().start()
  .then(port => console.log(`\n\n!!! SUCCESS !!!    Running on port ${port}    !!! SUCCESS !!!`))
  .catch(error => {
    console.error(error)
  });

export default starter;
