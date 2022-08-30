const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../components/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
