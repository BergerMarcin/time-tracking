import {config} from "dotenv-flow";

const setEnvs = () => {
  console.log('\n\nš§ š§ š§ š§ š§ š§ š§    Setting process.envs from .env.* files    š§ š§ š§ š§ š§ š§ š§');
  // process.env.NODE_ENV should be set @ package.json
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  console.log('Starting directory for process.env: ' + process.cwd());
  // process envs from .env.* files
  const result = config();
  console.log('parsed process.env from .env files: ', result)
  if (result.error) throw result.error
}

export default setEnvs;