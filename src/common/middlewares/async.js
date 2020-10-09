module.exports = function asyncMiddleware(handler) {
  return async function(req, res, next) {
    try {
      await handler;
    } catch (ex) {
      next(ex);
    }
  };
};
