const { User } = require("../models/user");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const Joi = require("joi");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({
      message: "Invalid Username Or Password",
    });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({
      message: "Invalid Username Or Password",
    });
  }
  const token = User.generateAuthToken();
  res.send({
    Token: token,
  });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  });
  return schema.validate(req);
}

module.exports = router;
