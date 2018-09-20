import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './22-swagger.json'; // change the version of this file for each change you make in paths.json and/or definitions.json
import pathsDoc from './paths.json';
import definitionsDoc from './definitions.json';
import config from '../environment';

export default (app) => {
  swaggerDoc.paths = pathsDoc;
  swaggerDoc.definitions = definitionsDoc;
  swaggerDoc.host = config.swagger.host;

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
