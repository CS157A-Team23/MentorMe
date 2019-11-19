const io = require("../app").io;
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const { Chat } = require("../models/Chat");
const { Chatlog } = require("../models/Chatlog");
const { User } = require("../models/User");
const db = require("../modules/database");
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const ADD_CHAT = "ADD_CHAT";
const USER_CONNECT = "USER_CONNECT";
const GET_TOPIC_CHATLOG = "GET_TOPIC_CHATLOG";
const GET_CHATLOGS = "GET_CHATLOGS";

const connectedUsers = {};

module.exports = function(socket) {
  console.log(`Connect | Socket: [${socket.id}]`);

  let userInfo; // stores decoded JWT Token info

  /**
   * User connects: Get jwt token to verify identity.
   * Return an array of chat objects with data included.
   */
  socket.on(USER_CONNECT, token => {
    console.log("Entered user connect");
    userInfo = authenticateUser(token);
    if (!userInfo) return;
    console.log(
      `Verified User | Socket: [${socket.id}] ID: [${userInfo.id}] Name: [${userInfo.first_name} ${userInfo.last_name}]`
    );
    connectedUsers[userInfo.id] = socket.id;
  });

  socket.on(GET_CHATLOGS, callback => {
    if (!userInfo) return;
    getUserChats(userInfo).then(array => {
      console.log("Sending chatlogs to user");
      callback(array);
    });
  });

  /**
   * User sends message: Log the message in the database.
   * Reformat the message so only those listening on those chats can catch.
   * Emit the message to all users.
   */
  socket.on(MESSAGE_SEND, (chatid, message) => {
    console.log("MESSAGE_SEND entered");
    if (!userInfo) {
      socket.emit(MESSAGE_ERROR, "User not verified");
      return;
    }
    db.query(
      `INSERT INTO chatlog(message, user_id, chat_id, created_at) VALUES(?,?,?, NOW())`,
      {
        replacements: [message, userInfo.id, chatid],
        type: db.QueryTypes.INSERT
      }
    );
    const time = new Date().toISOString();
    socket.broadcast.emit(`${MESSAGE_RECIEVE}-${chatid}`, {
      message,
      name: userInfo.first_name,
      created_at: time
    });
    socket.emit(`${MESSAGE_RECIEVE}-${chatid}`, {
      message,
      name: "Me",
      created_at: time
    });
  });

  /**
   * User disconnects: Log onto console.
   */
  socket.on("disconnect", () => {
    let usrstr = "";
    if (userInfo) {
      delete connectedUsers[userInfo.id];
      usrstr = `ID: [${userInfo.id}] Name: [${userInfo.first_name} ${userInfo.last_name}]`;
    }
    console.log(`Disconnect | Socket: [${socket.id}] ${usrstr}`);
  });
};

async function getTopicChat(topidid) {}

/**
 * Gets an array of chat data objects.
 */
async function getUserChats(userInfo) {
  console.log("Generating Chatlogs");
  const chats = await db.query(
    `SELECT * FROM chat
        WHERE user1_id=? OR user2_id=?`,
    { replacements: [userInfo.id, userInfo.id], type: db.QueryTypes.SELECT }
  );
  console.log("Creating Chat Objects");
  return Promise.all(chats.map(chat => generateChatlog(chat, userInfo.id)));
}

/**
 * Generates chatlogs for one chat
 */
const generateChatlog = async (chat, id) => {
  const logs = await db.query(
    `SELECT message, user_id, created_at, first_name 
        FROM chatlog JOIN user ON user_id=user.id
        WHERE chat_id=? ORDER BY created_at`,
    { replacements: [chat.id], type: db.QueryTypes.SELECT }
  );
  const messages = logs.map(log => {
    return {
      message: log.message,
      name: log.user_id === id ? "Me" : log.first_name,
      created_at: log.created_at
    };
  });
  let name;
  const otherId = chat.user1_id === id ? chat.user2_id : chat.user1_id;
  const user = await db.query(
    `SELECT id, first_name, last_name, email FROM user WHERE id = ?`,
    { replacements: [otherId], plain: true }
  );
  return {
    id: chat.id,
    name: user.first_name,
    messages
  };
};

/**
 * Authenticates User in websocket connection. Uses JWT token.
 */
function authenticateUser(token) {
  if (!token) return;
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    return decoded;
  } catch (ex) {
    return;
  }
}

/**
 * Alerts online users if a new chat is added.
 */
function alertNewChat(userid, chatid, chatname) {
  console.log(userid, chatid, chatname);
  if (connectedUsers[userid]) {
    io.to(connectedUsers[userid]).emit(ADD_CHAT, {
      id: chatid,
      name: chatname,
      messages: []
    });
  }
}

module.exports.alertNewChat = alertNewChat;
