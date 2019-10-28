const Sequelize = require('sequelize');
const db = require('../modules/database');

const Proficiency = db.define('proficiency', {
    skill: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
});

//Chatlog.removeAttribute('id');

function validateProficiency(proficiency) {
    const schema = Joi.object({
       name:  Joi.number().integer().min(1).max(5).required()
    });
    return schema.validate(proficiency);

}
exports.Proficiency = Proficiency;
exports.validateProficiency = validateProficiency;