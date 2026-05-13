/**
 * Wraps an async Express route handler to catch errors
 * and forward them to the error handling middleware.
 *
 * Usage: router.get('/users', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
