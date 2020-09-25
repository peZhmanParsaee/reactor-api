const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes');
const cors = require('./common/middlewares/cors');

const logErrors = require('./common/middlewares/log-errors');
const clientErrorHandler = require('./common/middlewares/client-error-handler');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

routes.init(app);

logErrors(app);
clientErrorHandler(app);

module.exports = app;
