import React, { Component } from "react";
import Card from "./Card";
import { Container } from "react-bootstrap";
import _ from "lodash";
import axios from 'axios';

const title_style = {
  padding: 20
};

class TopicsSearch extends Component {
state = {
  name: "",
  search: ""
};
  


handleSubmit = event => {
  event.preventDefault();
  this.setState({
    search: this.state.search
  });
};

trackChange = event => {
  this.setState({
    search: event.target.value
  });
};

  renderCards = function() {
    const { search } = this.state;
    const { data, loaded, onSetTopic, onToggleInterest } = this.props;
    // filter cards here
    let filtered =
      search.length === 0
        ? data
        : data.filter(t =>
            _.startsWith(t.name.toLowerCase(), search.toLowerCase())
          );
    const rows = [];
    for (let i = 0; i < filtered.length; i += 2) {
      if (i + 1 >= filtered.length) {
        rows.push(
          <div className="row" style={title_style}>
            <div className="col">
              <Card
                topic={filtered[i]}
                onSetTopic={onSetTopic}
                onToggleInterest={onToggleInterest}
              />
            </div>
          </div>
        );
      } else {
        rows.push(
          <div className="row" style={title_style}>
            <div className="col">
              <Card
                topic={filtered[i]}
                onSetTopic={onSetTopic}
                onToggleInterest={onToggleInterest}
              />
            </div>
            <div className="col">
              <Card
                topic={filtered[i + 1]}
                onSetTopic={onSetTopic}
                onToggleInterest={onToggleInterest}
              />
            </div>
          </div>
        );
      }
    }
    return rows;
  };

  render() {
    const { search } = this.state;
    const { loaded } = this.props;

    return (
      <Container>
        {loaded ? (
          <React.Fragment>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <input
                className="form-control mr-sm-2"
                type="text"
                value={search}
                onChange={this.trackChange}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <br></br>
            <Container>
                {this.renderCards()}
            </Container>
        
        </React.Fragment>): (<div className="spinner-border spinner-border-xl" role="status"></div>)}
        </Container>  );
    }
}

export default TopicsSearch;
