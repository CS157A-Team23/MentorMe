const config = require("config");
const jwt = require("jsonwebtoken");

generateAuthToken = async function(user) {
  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name
  };
  const token = jwt.sign(payload, config.get("jwtPrivateKey"));
  return token;
};

module.exports.generateAuthToken = generateAuthToken;
