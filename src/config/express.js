/**
 * Express configuration
 */

import morgan from 'morgan';
import compression from 'compression';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';

export default (app) => {
  const env = app.get('env');

  app.use(morgan('dev'));

  app.use(compression());
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(methodOverride());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.end();
    } else {
      next();
    }
  });


  if (env === 'development' || env === 'local' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
};

