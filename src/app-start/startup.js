const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('../infrastructures/middlewares/cors');
const expressValidator = require('express-validator');
const bodySanitizer = require('../infrastructures/middlewares/body-sanitizer');

module.exports = (app) => {
  global.__baseDir = __dirname;  
  
  app.use(cors());

  app.use(bodyParser.json());
  
  app.use(morgan('dev'));

  app.use(expressValidator({
    customValidators: {
      lessThan: (value1, value2) => {
        return value1 < value2;
      },
      lessThanOrEqual: (value1, value2) => {
        return value1 <= value2;
      },
      isArray: (value) => {
        return Array.isArray(value) && value.length > 0;
      },
      isString: value => {
        return typeof value === 'string';
      },
      eachIsEmpty: (values, prop) => {
        let notValid = false;
        for (let i = 0; i < values.length; i++) {
          if (values.hasOwnProperty(prop)) {
            if (validator.isEmpty(values[i][`${prop}`])) {
              notValid = true;
              break;
            }
          } else {
            notValid = true;
            break;
          }
        }
        return notValid;
      }
    }
  }));

  app.use(bodySanitizer());
};
