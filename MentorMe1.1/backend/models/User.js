const Sequelize = require('sequelize');
const db = require('../modules/database');
const Joi = require('@hapi/joi');

const User = db.define('user', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,50]
        }
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,50]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len:[5,255]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5, 1024]
        }
    }
},{underscored: true});

function validateUser(user) {
    const schema = Joi.object({
        first_name:  Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);

}

exports.User = User;
exports.validateUser = validateUser;