import React, { Component } from "react";
import Card from "./Card";
import { Container, Button, FormControl, FormGroup } from "react-bootstrap";
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
  
addTopic = async function(cred) {
  const {renderAdditionalTopic} = this.props;
  const {name} = cred;
  console.log("entered post");
  await axios.post("/api/topics", {name}, {
      headers: {"x-auth-token": sessionStorage.getItem("authToken")}
  }).then(res => {
      console.log("entered success");
      console.log(res.data);
      if(res.status === 200) {
        renderAdditionalTopic();
        this.render();
      }
  }).catch(err => {
      console.log(err.message);
  })
};

handleSubmit = event => {
  event.preventDefault();
  this.setState({
    search: this.state.search
  });
};

handleAddTopic = event => {
  event.preventDefault();
  this.addTopic(this.state);
};

trackChange = event => {
  this.setState({
    search: event.target.value
  });
};

trackAddChange = event =>{
  this.setState({
    [event.target.id]: event.target.value
  });
}

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
                <br></br>
                <div className="row">
                    <div className = "col">
                        <form className="card" onSubmit={this.handleAddTopic}>
                            <h1 className="text-center" style={title_style}>Add Topic</h1>
                            <div class="form-group row">
                            <label class="col-sm-2 offset-sm-1"> Topic Name </label>
                            <div class="col-sm-8">
                            <FormGroup controlId="name" bsSize="medium">
                                <FormControl type="name" value={this.state.name} onChange = {this.trackAddChange}/>
                            </FormGroup>                               
                            </div>
                            </div>
                            <div class="row">
                            <div class="col-sm-8 offset-sm-2">
                                <Button block bsSize="large" type="submit">Add</Button>
                                <br></br>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        
        </React.Fragment>): (<div className="spinner-border spinner-border-xl" role="status"></div>)}
        </Container>  );
    }
}

export default TopicsSearch;
