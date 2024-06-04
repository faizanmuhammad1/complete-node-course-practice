module.exports = function isAdmin() {
  if (!req.user.isAdmin) {
    return res.status(403).send({
      message: "access denied",
    });
  }
  next();
};
