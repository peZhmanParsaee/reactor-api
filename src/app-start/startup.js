const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('../infrastructures/middlewares/cors');

module.exports = (app) => {
  global.__baseDir = __dirname;  
  
  app.use(cors());

  app.use(bodyParser.json());

  app.use(morgan('tiny'));
}
