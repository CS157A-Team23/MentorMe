const Sequelize = require("sequelize");
const db = require("../modules/database");
const Joi = require("@hapi/joi");

const Topic = db.define("topic", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 50]
        }
    }
});

function validateTopic(topic) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required()
    });
    return schema.validate(topic);
}

exports.Topic = Topic;
exports.validateTopic = validateTopic;
