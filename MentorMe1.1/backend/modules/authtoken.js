const config = require('config');
const jwt = require('jsonwebtoken');
const {Chat} = require('../models/Chat');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

generateAuthToken = async function(user) {
    const payload = {id: user.id, first_name: user.first_name, last_name: user.last_name };
    let chats = await Chat.findAll({
        attributes: ['id'],
        where: {
            [Op.or]: [{user1_id: user.id},{user2_id:user.id}]
        }
    });
    chats = chats.map(chat => chat.id);
    payload.chats = chats;
    const token = jwt.sign(payload, config.get('jwtPrivateKey'));
    return token;
}

module.exports.generateAuthToken = generateAuthToken;