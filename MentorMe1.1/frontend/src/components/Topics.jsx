import React, { Component } from "react";
import TopicChat from "./TopicChat";

class Topics extends Component {
  state = {};

  render() {
    const { socket } = this.props;
    const topicid = 1;
    return (
      <React.Fragment>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="w-100" />
        {/* <TopicChat socket={socket} topicid={topicid} /> */}
      </React.Fragment>
    );
  }
}

export default Topics;
