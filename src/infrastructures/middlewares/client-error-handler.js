module.exports = (app) => {
  
  // Catch 404 errors
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Handle errors on development
  if (process.env.NODE_ENV === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500).send({
        message: err.message,
        error: err
      });
    });
  }
  
  // Handle errors on production
  app.use(function (err, req, res, next) {
    console.log('using production error handler');
    res.status(err.status || 500).send({
      message: err.message,
      error: {}
    });
  });
};