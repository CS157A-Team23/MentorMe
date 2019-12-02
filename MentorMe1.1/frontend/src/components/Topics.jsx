import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import { Container, Button, FormControl, FormGroup } from "react-bootstrap";
import TopicsSearch from "./TopicsSearch";
import TopicChat from "./TopicChat";

const title_style = {
  padding: 20
};

class Topics extends Component {
  state = {
    data: [],
    loaded: false,
    activeID: null,
    name:""
  };

  handleSetTopic = topicid => {
    this.setState({ activeID: topicid });
  };

  handleInterest = topic => {
    const data = [...this.state.data];
    console.log(topic);
    const action = topic.interested
      ? `/api/topics/${topic.topicid}/removeinterest`
      : `/api/topics/${topic.topicid}/addinterest`;
    axios
      .post(
        action,
        {},
        {
          headers: { "x-auth-token": sessionStorage.getItem("authToken") }
        }
      )
      .catch(err => console.log(err.response.data));
    topic.interested = !topic.interested;
    this.setState({ data });
  };

  trackAddChange = event =>{
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleAddTopic = event => {
    event.preventDefault();
    this.addTopic(this.state);
  };

  addTopic = async function(cred) {
    const {name} = cred;
    console.log("entered post");
    await axios.post("/api/topics", {name}, {
        headers: {"x-auth-token": sessionStorage.getItem("authToken")}
    }).then(res => {
        console.log("entered success");
        console.log(res.data);
        if(res.status === 200) {
          this.componentDidMount();
          this.render();
        }
    }).catch(err => {
        console.log(err.message);
    })
  };

  componentDidMount() {
    axios
      .get("/api/topics", {
        headers: { "x-auth-token": sessionStorage.getItem("authToken") }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data, loaded: true });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    const { data, loaded, activeID } = this.state;
    const { socket } = this.props;
    return (
      <React.Fragment>
        {activeID ? (
          <TopicChat
            socket={socket}
            topicid={activeID}
            onSetTopic={id=>this.handleSetTopic(id)}
            onToggleInterest={topic => this.handleInterest(topic)}
          />
        ) : (
          <TopicsSearch
            data={data}
            loaded={loaded}
            onSetTopic={id => this.handleSetTopic(id)}
            onToggleInterest={topic => this.handleInterest(topic)}
          ></TopicsSearch>
        )}
        <Container>
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
        {/* <TopicChat socket={socket} topicid={topicid} /> */}
      </React.Fragment>
    );
  }
}

export default Topics;
