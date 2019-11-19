import React, { Component } from "react";

class Header extends Component {
    state = {}

    render(){
        return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">MentorMe</a>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>);
    }
}

export default Header
// date-fns
//socket.off("event");
