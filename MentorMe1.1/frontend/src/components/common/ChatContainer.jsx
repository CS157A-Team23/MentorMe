import React from "react";
import "../../css/ChatContainer.css";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
const ChatContainer = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card " style={{ height: "550px" }}>
            <div className="card-header border border-primary shadow p-3 mb-5 bg-light rounded">
              <h3>Chat {props.chat.name}</h3>
            </div>
            <ChatMessages messages={props.messages} />
            <ChatInput onSend={props.onSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
// chatid={activeChat}
// socket={socket}
// messages={activeChat ? activeChat.messages : null}
// name={tempUsername}
// onSend={message =>
// this.handleSend(activeChat.id, tempUsername, message)
//                     }
