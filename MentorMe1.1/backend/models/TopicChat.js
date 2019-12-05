const db = require("../modules/database");
const { Topic } = require("./Topic");
const { Chat } = require("./Chat");
const Sequelize = require("sequelize");

const TopicChat = db.define("topicchat", {
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

TopicChat.removeAttribute("id");

exports.TopicChat = TopicChat;
