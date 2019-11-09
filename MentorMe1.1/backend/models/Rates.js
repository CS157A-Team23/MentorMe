const Sequelize = require("sequelize");
const db = require("../modules/database");
const Joi = require("@hapi/joi");
const Rates = db.define("rates", {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    }
});

//Chatlog.removeAttribute('id');

function validateRating(rating) {
    const schema = Joi.object({
        rating: Joi.number()
            .integer()
            .min(1)
            .max(10)
            .required()
    });
    return schema.validate(rating);
}
exports.Rates = Rates;
exports.validateRating = validateRating;
