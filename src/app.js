const express = require('express');
const startup = require('./app-start/startup');
const routes = require('./api/v1/index');

const app = express();

startup(app);
routes(app);

module.exports = app;
