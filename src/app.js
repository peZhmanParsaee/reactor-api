const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const routes = require('./routes');
const cors = require('./common/middlewares/cors');
const error = require('./common/middlewares/error');

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

routes.init(app);
app.use(error);

module.exports = app;
