import React, { Component } from "react";
import axios from "axios";
import ChatContainer from "./common/ChatContainer";
const GET_TOPIC_CHATLOG = "GET_TOPIC_CHATLOG";
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";

class TopicChat extends Component {
  state = {
    chat: null,
    event: null,
    members: []
  };

  componentDidMount() {
    const { socket, topicid } = this.props;
    socket.emit(GET_TOPIC_CHATLOG, topicid, this.initializationCallback);
    axios
      .get(`/api/topics/${topicid}/members`)
      .then(res => {
        console.log(res.data);
        this.setState({ members: res.data });
      })
      .catch(err => console.log(err.message));
  }

  componentWillUnmount() {
    const { event } = this.state;
    const { socket } = this.props;
    if (event) {
      socket.off(event);
    }
  }

  initializationCallback = chat => {
    const { event } = this.state;
    const { socket } = this.props;
    console.log("Topic chatlog recieved");
    const listenEvent = `${MESSAGE_RECIEVE}-${chat.id}`;
    socket.on(listenEvent, message => {
      const { chat } = this.state;
      const newChat = { ...chat };
      newChat.messages.push(message);
      this.setState({ chat: newChat });
    });
    console.log(chat);
    this.setState({ chat, event: listenEvent });
  };

  handleSendMessage = message => {
    const { chat } = this.state;
    console.log(chat.id, message);
    this.props.socket.emit(MESSAGE_SEND, chat.id, message);
  };

  renderMembers() {
    const { members } = this.state;
    return (
      <ul className="list-group">
        {members.map(mem => {
          return mem.id != sessionStorage.getItem("id") ? (
            <li key={mem.id} className="list-group-item">
              {mem.first_name + " " + mem.last_name}
            </li>
          ) : null;
        })}
      </ul>
    );
  }
  renderChatContainer() {
    const { chat } = this.state;
    return chat ? (
      <ChatContainer
        chat={chat}
        messages={chat.messages}
        onSend={message => this.handleSendMessage(message)}
      />
    ) : null;
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">{this.renderChatContainer()}</div>
          <div className="col">{this.renderMembers()}</div>
        </div>
      </div>
    );
  }
}

export default TopicChat;
