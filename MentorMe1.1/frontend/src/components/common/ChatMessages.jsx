import React, { Component } from "react";

class ChatMessages extends Component {
    state = {};
    messagesEndRef = React.createRef();

    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }

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
                            <strong className="primary-font">
                                {message.name}
                            </strong>{" "}
                            <small className="text-muted">
                                <span className="glyphicon glyphicon-time"></span>
                                {message.created_at}
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
            <div className="panel-body">
                <ul className="chat">
                    {this.renderMessages(this.props.messages)}
                    <div ref={this.messagesEndRef} />
                </ul>
            </div>
        );
    }
}

export default ChatMessages;
