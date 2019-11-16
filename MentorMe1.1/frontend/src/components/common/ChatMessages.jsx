import React, { Component } from "react";
import { formatRelative, formatDistance } from "date-fns";
class ChatMessages extends Component {
  state = {
    minutes: 0
  };

  messagesEndRef = React.createRef();

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 60000);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    this.setState({ minutes: this.state.minutes + 1 });
  };

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  renderMessages = messages => {
    let counter = 0;
    return messages.map(message => {
      return (
        <li key={counter++} className="clearfix">
          <div className="chat-body clearfix">
            <div className="header">
              <strong className="primary-font">{message.name}</strong>{" "}
              <small className="text-muted">
                <span className="glyphicon glyphicon-time"></span>
                {formatDistance(new Date(message.created_at), new Date(), {
                  addSuffix: true
                })}
              </small>
            </div>
            <p>{message.message}</p>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="card-body">
        <ul className="chat">
          {this.renderMessages(this.props.messages)}
          <div ref={this.messagesEndRef} />
        </ul>
      </div>
    );
  }
}

export default ChatMessages;
