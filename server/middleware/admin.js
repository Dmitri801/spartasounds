const admin = function(req, res, next) {
  if (!req.user.isAdmin) {
    return res.send("You're not allowed here bud....");
  } else {
    next();
  }
};

module.exports = { admin };
