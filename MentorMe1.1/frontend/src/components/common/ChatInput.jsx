import React, { Component } from "react";

class ChatInput extends Component {
    state = {
        message: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        this.sendMessage();
        this.setState({ message: "" });
    };

    sendMessage = () => {
        this.props.onSend(this.state.message);
    };
    render() {
        const { message } = this.state;
        return (
            <div className="panel-footer">
                <div className="input-group">
                    <input
                        id="message"
                        ref={"messageinput"}
                        type="text"
                        value={message}
                        className="form-control input-sm"
                        placeholder="Type your message here..."
                        onChange={({ target }) => {
                            this.setState({ message: target.value });
                        }}
                    />
                    <span className="input-group-btn">
                        <button
                            onClick={this.handleSubmit}
                            disabled={message.length < 1}
                            className="btn btn-warning btn-sm"
                            id="btn-chat"
                        >
                            Send
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default ChatInput;
