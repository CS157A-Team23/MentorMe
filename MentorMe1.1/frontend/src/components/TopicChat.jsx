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
    members: [],
    activeMember: null
  };

  goBack = (id) => {
    const { socket, topicid, onSetTopic} = this.props;
    onSetTopic(null);
  }

  componentDidMount() {
    const { socket, topicid, setBack} = this.props;
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

  handleActivateMember = mem => {
    const { activeMember } = this.state;
    if (mem === activeMember) {
      this.setState({ activeMember: null });
    } else {
      this.setState({ activeMember: mem });
    }
  };
  handleRequest = (mem, asmentor) => {
    axios.post(
      "/api/relations/set",
      {
        id: mem.id,
        topicid: this.props.topicid,
        asmentor
      },
      { headers: { "x-auth-token": sessionStorage.getItem("authToken") } }
    );
    this.setState({ activeMember: null });
  };

  renderStars = (filled, max) => {
    const ratio = filled / max;
    let color = "orange";
    if (ratio <= 0.2) {
      color = "red";
    } else if (ratio >= 0.6) {
      color = "green";
    }
    const hearts = [];
    for (let i = 1; i <= max; i++) {
      if (i <= filled) {
        hearts.push(<i className="fa fa-circle" style={{ color }}></i>);
      } else {
        hearts.push(<i className="fa fa-circle-o"></i>);
      }
    }
    return <span className="ml-1">{hearts}</span>;
  };

  renderMembers() {
    const { members, activeMember } = this.state;
    return (
      <ul className="list-group">
        {members.map(mem => {
          return mem.id != sessionStorage.getItem("id") ? (
            <li
              onClick={() => this.handleActivateMember(mem)}
              key={mem.id}
              className="list-group-item"
            >
              {mem.first_name + " " + mem.last_name}
              {this.renderStars(mem.skill ? mem.skill : 0, 5)}
              {activeMember === mem ? (
                <React.Fragment>
                  <div className="w-100" />
                  <button
                    className="text-center btn btn-outline-primary mx-1"
                    onClick={() => this.handleRequest(mem, true)}
                  >
                    Request Mentor
                  </button>
                  <button
                    className="text-center btn btn-outline-primary mx-1"
                    onClick={() => this.handleRequest(mem, false)}
                  >
                    Request Mentee
                  </button>
                </React.Fragment>
              ) : null}
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
          <div className="col-xs-1">
            <button className="justify-content-center text-center btn btn-outline-primary" 
              onClick={() => this.goBack(null)}>Back
              </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TopicChat;
