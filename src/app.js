const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const cors = require('./common/middlewares/cors');

const logErrors = require('./common/middlewares/log-errors');
const clientErrorHandler = require('./common/middlewares/client-error-handler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

routes.init(app);

logErrors(app);
clientErrorHandler(app);

module.exports = app;
