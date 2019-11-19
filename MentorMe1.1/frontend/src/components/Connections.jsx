import React, { Component } from "react";
import ChatContainer from "./common/ChatContainer";
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const ADD_CHAT = "ADD_CHAT";

const GET_CHATLOGS = "GET_CHATLOGS";
class Connections extends Component {
  state = {
    chats: [],
    activeChat: null,
    events: []
  };

  //-------------------------------- LIFECYCLE HOOKS --------------------------------//

  componentDidMount() {
    this.initializeChatState();
  }
  componentWillUnmount() {
    const {events} = this.state;
    const {socket} = this.props;
    events.forEach(event => {
      socket.off(event);
    });
  }

  //---------------------------- SOCKET SETUP & HANDLERS ------------------------------//

  /**
   * Initializing required states by requesting them from the backend.
   * Sets up listeners for all chats and for potential new chats.
   */
  initializeChatState = () => {
    const { socket } = this.props;
    socket.emit(GET_CHATLOGS, this.initializationCallback);
    socket.on(ADD_CHAT, chat => {
      let newChats = [...this.state.chats, chat];
      let newEvents  =[...this.state.events, `${MESSAGE_RECIEVE}-${chat.id}`];
      socket.on(
        `${MESSAGE_RECIEVE}-${chat.id}`,
        this.socketRecieverSetup(chat.id)
      );
      this.setState({ chats: newChats, events: newEvents });
    });
  };

  /**
   * Callback helper function for initialization above.
   * Is called by backend after it readies all chats.
   * Loops through all chat objects and assigns a listener for those endpoints
   */
  initializationCallback = newChats => {
    const { events } = this.state;
    const { socket } = this.props;
    console.log("Initial chatlogs recieved");
    console.log(newChats);
    const newEvents = [];
    newChats.forEach(chat => {
      newEvents.push(`${MESSAGE_RECIEVE}-${chat.id}`);
      socket.on(
        `${MESSAGE_RECIEVE}-${chat.id}`,
        this.socketRecieverSetup(chat.id)
      );
    });
    this.setState({ chats: newChats, events:[...events, ...newEvents] });
  };

  /**
   * Appending a message to the chat designated.
   * Each chat listens for their own message.
   */
  socketRecieverSetup = chatId => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });
      this.setState({ chats: newChats });
    };
  };

  //-------------------------------- EVENT HANDLERS --------------------------------//

  /**
   * Sets the active chat to one selected.
   */
  handleSetActiveChat = chat => {
    this.setState({ activeChat: chat });
  };

  /**
   * Emits a message to the backend
   */
  handleSendMessage = (chatid, message) => {
    console.log(chatid, message);
    this.props.socket.emit(MESSAGE_SEND, chatid, message);
  };

  //-------------------------------- RENDER FUNCTIONS --------------------------------//

  renderChatContainer() {
    const { chats, activeChat } = this.state;
    const { socket } = this.props;
    return (
      <React.Fragment>
        {activeChat ? (
          <ChatContainer
            chat={activeChat}
            socket={socket}
            messages={activeChat ? activeChat.messages : null}
            onSend={message => this.handleSendMessage(activeChat.id, message)}
          />
        ) : (
          <div className="jumbotron">
            <p className="lead">
              Select a chat on the right to begin chatting!
            </p>
          </div>
        )}
      </React.Fragment>
    );
  }

  renderConnectionList() {
    const { chats, activeChat } = this.state;
    const { socket } = this.props;

    return (
      <React.Fragment>
        <ul className="list-group">
          {chats.map(chat => (
            <li
              key={chat.id}
              onClick={() => this.handleSetActiveChat(chat)}
              className={
                chat === activeChat
                  ? "list-group-item list-group-item-primary"
                  : "list-group-item"
              }
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h3>Connections</h3>
            {this.renderChatContainer()}
          </div>
          <div className="col-3">{this.renderConnectionList()}</div>
        </div>
      </div>
    );
  }
}

export default Connections;
