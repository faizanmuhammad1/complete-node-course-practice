const config = require("config");
const jwt = require("jsonwebtoken");
module.exports  =  function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send({ message: "Access Denied" });
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (ex) {
    send.status(400).send({ message: "invalid token" });
  }
};
