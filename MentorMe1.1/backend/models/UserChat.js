const db = require("../modules/database");
const { User } = require("./User");
const { Chat } = require("./Chat");
const Sequelize = require("sequelize");

const UserChat = db.define("userchat", {
  user1_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  user2_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
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

UserChat.removeAttribute("id");

exports.UserChat = UserChat;
