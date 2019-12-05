const Joi = require("@hapi/joi");

function validateID(id) {
  const schema = Joi.number()
    .integer()
    .min(0)
    .required();
  return schema.validate(id);
}

module.exports.validateID = validateID;
