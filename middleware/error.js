module.exports = function (err, req, res, next) {
  res.status(500).res({ message: "something failed" });
};
