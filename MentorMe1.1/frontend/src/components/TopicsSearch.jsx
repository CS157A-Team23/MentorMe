import React, { Component } from "react";
import Card from "./Card";
import { Container } from "react-bootstrap";

const title_style = {
  padding: 20
};

class TopicsSearch extends Component {
  state = {};

  renderCards = function() {
    const { data, loaded, onSetTopic, onToggleInterest } = this.props;
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      if (i + 1 >= data.length) {
        rows.push(
          <div className="row" style={title_style}>
            <div className="col">
              <Card
                topic={data[i]}
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
                topic={data[i]}
                onSetTopic={onSetTopic}
                onToggleInterest={onToggleInterest}
              />
            </div>
            <div className="col">
              <Card
                topic={data[i + 1]}
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
    const { data, loaded } = this.props;
    return (
      <Container>
        {loaded ? (
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
            <br></br>
            <Container>{this.renderCards()}</Container>
          </React.Fragment>
        ) : (
          <div className="spinner-border spinner-border-xl" role="status"></div>
        )}
      </Container>
    );
  }
}

export default TopicsSearch;
