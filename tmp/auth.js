const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');

const authMiddleware = (req, res, next) => {
  // Skip auth for login endpoint
  if (req.path === '/api/auth/login' && req.method === 'POST') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError('Invalid or expired token', 403);
  }
};

module.exports = authMiddleware;
