const Sequelize = require('sequelize');
const {Topic} = require('./Topic');
const db = require('../modules/database');

const Mentors = db.define('mentors', {
    topic_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Topic,
            key: 'id'
        }
    }
});

//Chatlog.removeAttribute('id');


exports.Mentors = Mentors;