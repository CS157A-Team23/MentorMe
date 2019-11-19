const Sequelize = require("sequelize");
const { Topic } = require("./Topic");
const { Chat } = require("./Chat");
const db = require("../modules/database");
const Joi = require("@hapi/joi");

const Mentors = db.define("mentors", {
  mentee_accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  mentor_accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  topic_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Topic,
      key: "id"
    }
  },
  chat_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Chat,
      key: "id"
    }
  }
});

function validateMent(body) {
  const schema = Joi.object({
    id: Joi.number()
      .integer()
      .min(0)
      .required(),
    topicid: Joi.number()
      .integer()
      .min(0)
      .required(),
    asmentor: Joi.boolean().required()
  });
  return schema.validate(body);
}
exports.Mentors = Mentors;
exports.validateMent = validateMent;
