const express = require('express');
const startup = require('./app-start/startup');
const routes = require('./api/v1/index');
const logErrors = require('./infrastructures/middlewares/log-errors');
const clientErrorHandler = require('./infrastructures/middlewares/client-error-handler');

const app = express();

startup(app);
routes(app);
logErrors(app);
clientErrorHandler(app);

module.exports = app;
