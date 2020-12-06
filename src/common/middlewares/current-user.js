import jwt from 'jsonwebtoken';
const config = require('../../config');

export const currentUser = (req, res, next) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, config.jwtKey);
    req.currentUser = payload;
  } catch {}

  next();
};
