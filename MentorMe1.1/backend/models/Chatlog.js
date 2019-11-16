const Sequelize = require("sequelize");
const db = require("../modules/database");

const Chatlog = db.define("chatlog", {
  message: {
    type: Sequelize.STRING(511),
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

//Chatlog.removeAttribute('id');

exports.Chatlog = Chatlog;
