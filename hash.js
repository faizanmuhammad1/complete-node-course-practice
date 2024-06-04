const bcrypt = require("bcrypt");

async function hashing(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

module.exports = hashing;
