import express from 'express';
import http from 'http';

import config from './config/environment';
import configureExpress from './config/express';
import configurePassport from './config/passport';
// import configureSwagger from './config/swagger/swagger';

import syncDatabase from './config/umzug';

import setupAuthRoutes from './auth';
import setupRoutes from './api/routes';
import Log from './utilities/log';

// Setup server
const app = express();
const server = http.createServer(app);

configureExpress(app);
configurePassport(app);

setupAuthRoutes(app);
setupRoutes(app);

// configureSwagger(app);

syncDatabase()
  .catch(err => Log.error(`${err.name}: ${err.message}`))
  .finally(() => {
    server.listen(config.port, config.ip, () => {
      Log.info(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
    });
  });

export default app;
