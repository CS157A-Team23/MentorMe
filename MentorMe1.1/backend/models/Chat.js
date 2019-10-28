const db = require('../modules/database');
const {User} = require('./User');
const Sequelize = require('sequelize');

const Chat = db.define('chat', {
    user1_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    user2_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
    // Topic id created with association
});


exports.Chat = Chat;
