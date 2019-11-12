import React, { Component } from "react";
import ChatManager from "./components/ChatManager";
import io from "socket.io-client";
const socketURL = window.location.host;

class App extends Component {
  state = {
    socket: io({ transports: ["websocket"] })
  };

  constructor(props) {
    super(props);
    sessionStorage.setItem(
      "authToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImZpcnN0MSIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzEsMl0sImlhdCI6MTU3MzI3Mjg5NX0.UMuBYJ54MxhOcgXEJ1jQDW_imtzE4-JYUFQFIsebPc4"
    );
  }

  componentDidMount() {
    const { socket } = this.state;
    console.log(socketURL);
    socket.on("connect", () => {
      console.log("connected");
    });
  }

  // dont unmount chat manager, just set zindex to hide
  render() {
    const { socket } = this.state;
    return <ChatManager socket={socket} />;
  }
}

export default App;
