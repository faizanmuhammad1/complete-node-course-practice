const { User, validate } = require("../models/user");
const express = require("express");
const _ = require("lodash");
const hashing = require("../hash");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({
      message: "Already Exist Email",
    });
  }
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.password = await hashing(user.password);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, "name", "email", "password"));
});

module.exports = router;
