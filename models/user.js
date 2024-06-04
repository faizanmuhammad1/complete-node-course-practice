const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const boolean = require("joi/lib/types/boolean");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 50,
    minlength: 5,
  },
  email: {
    type: String,
    require: true,
    maxlength: 255,
    minlength: 5,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    maxlength: 1024,
    minlength: 5,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.Admin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  };
  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
