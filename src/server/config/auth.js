module.exports = {
  ensureAutenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send({ error: 'You need to log in first' });
  }
};
