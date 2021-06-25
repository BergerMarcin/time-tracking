import {Pool} from 'pg';

// NOTE: Below must be function (instead of object) to avoid set/construct/call it before
//       process.envs is set with dotenv-flow package @ server.ts
const configuredPool = () => {
  return new Pool({
    connectionString: process.env.DB_CONNECTION,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
};

export default configuredPool;
