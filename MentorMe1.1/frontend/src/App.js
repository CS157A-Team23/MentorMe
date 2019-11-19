import React, { Component } from "react";
import Connections from "./components/Connections";
import io from "socket.io-client";
import Login from "./components/Login";
const socketURL = window.location.host;
const USER_CONNECT = "USER_CONNECT";

class App extends Component {
  state = {
    socket: io({ transports: ["websocket"] }),
    loggedin: false
  };

  constructor(props) {
    super(props);
    // set own user token when login
  }

  componentDidMount() {
    const { socket } = this.state;
    console.log(socketURL);
    socket.on("connect", () => {
      console.log("connected");
    });
  }

  setLogin = () => {
    this.setState({ loggedin: true });
    this.state.socket.emit(USER_CONNECT, sessionStorage.getItem("authToken"));
  };

  renderMain() {
    const { socket } = this.state;
    return (
      <React.Fragment>
        <div>
          <Connections socket={socket} />
        </div>
        <div></div>
      </React.Fragment>
    );
  }
  renderLogin() {
    return <Login setLogin={this.setLogin} />;
  }
  // dont unmount chat manager, just set zindex to hide
  render() {
    return (
      <React.Fragment>
        {this.state.loggedin ? this.renderMain() : this.renderLogin()}
      </React.Fragment>
    );
  }
}

export default App;
