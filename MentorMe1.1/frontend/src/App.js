import React, { Component } from "react";
import Connections from "./components/Connections";
import io from "socket.io-client";
import Login from './components/Login';
import Topics from './components/Topics';
import Profile from  './components/Profile';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
const socketURL = window.location.host;

class App extends Component {
  state = {
    socket: io({ transports: ["websocket"] }),
    loggedin: false,
    pageNumber: 0
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
    this.setState({loggedin:true});
  }

  setPage = (pageNumber) => {
    this.setState({pageNumber});
  }

  renderMain() {
    const { socket, pageNumber } = this.state;
    let display;
    switch (pageNumber) {
      case 0:
        display=<Topics/>;
        break;
      case 1:
        display=<Connections socket={socket} />;
        break;
      case 2:
        display=<Profile/>;
        break;
    }
    return (
    <React.Fragment>
      <div>{display}</div>
      <div><NavBar onSetPage={this.setPage}/></div>
    </React.Fragment>);
  }
  renderLogin() {
    return <Login setLogin={this.setLogin}/>
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
