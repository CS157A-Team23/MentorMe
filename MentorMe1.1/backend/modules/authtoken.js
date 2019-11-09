const config = require("config");
const jwt = require("jsonwebtoken");
const { Chat } = require("../models/Chat");
const Sequelize = require("sequelize");
const db = require("./database");
const Op = Sequelize.Op;

generateAuthToken = async function(user) {
    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name
    };
    let chats = await db.query(
        `SELECT id FROM chat
        WHERE user1_id = ? OR user2_id = ?`,
        { replacements: [user.id, user.id], type: db.QueryTypes.SELECT }
    );
    chats = chats.map(chat => chat.id);
    payload.chats = chats;
    const token = jwt.sign(payload, config.get("jwtPrivateKey"));
    return token;
};

module.exports.generateAuthToken = generateAuthToken;
