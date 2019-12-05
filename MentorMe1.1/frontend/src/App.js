import React, { Component } from "react";
import Connections from "./components/Connections";
import io from "socket.io-client";
import Login from "./components/Login";
import Topics from "./components/Topics";
import Profile from "./components/Profile";
import Header from "./components/Header";
import SignUp from "./components/signUp";
const USER_CONNECT = "USER_CONNECT";
const ATTEMPT_RECONNECT = "ATTEMPT_RECONNECT";

class App extends Component {
  state = {
    socket: io({ transports: ["websocket"] }),
    loggedin: false,
    pageNumber: 0
  };

  componentDidMount() {
    const { socket } = this.state;
    socket.on("connect", () => {
      console.log("connected");
    });
    // if backend server resets, reconnect to it
    socket.on(ATTEMPT_RECONNECT, () => {
      const authToken = sessionStorage.getItem("authToken");
      if (authToken) {
        socket.emit(USER_CONNECT, sessionStorage.getItem("authToken"));
        console.log("reconnecting user");
      }
    });
    // if session still live, log in automatically
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      this.setLogin();
    }
  }

  setLogin = () => {
    this.state.socket.emit(USER_CONNECT, sessionStorage.getItem("authToken"));
    this.setState({ loggedin: true });
  };

  setPage = pageNumber => {
    this.setState({ pageNumber });
  };

  renderMain() {
    const { socket, pageNumber } = this.state;
    let display;
    switch (pageNumber) {
      case 0:
        display = <Topics socket={socket} />;
        break;
      case 1:
        display = <Connections socket={socket} />;
        break;
      case 2:
        display = <Profile />;
        break;
    }
    return (
      <React.Fragment>
        <div>
          <Header onSetPage={this.setPage} />
        </div>
        <div>{display}</div>
      </React.Fragment>
    );
  }
  renderLogin() {
    return (
      <div>
        <div className="row">
          <h1 className="col text-center mt-4">MentorMe</h1>
        </div>
        <div className="row">
          <div className="col">
            <Login setLogin={this.setLogin} />
          </div>
          <div className="col">
            <SignUp setLogin={this.setLogin} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loggedin ? this.renderMain() : this.renderLogin()}
      </React.Fragment>
    );
  }
}

export default App;
