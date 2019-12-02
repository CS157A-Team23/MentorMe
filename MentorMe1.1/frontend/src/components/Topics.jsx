import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import { Container } from "react-bootstrap";
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
  };
  
  handleSetSkill = (skill, topic) => {
    console.log(skill, topic);
    axios.post(
      `/api/topics/${topic.topicid}/setskill`,
      {skill},
      { headers: { "x-auth-token": sessionStorage.getItem("authToken") } }
    )
    .then(res => {
      topic.skill = skill;
      this.setState({data: [...this.state.data]});
    })
    .catch(err => console.log(err.message));
  }

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
            onSetSkill = {(skill,topic) => this.handleSetSkill(skill, topic)}
            renderAdditionalTopic={() => this.componentDidMount()}
          ></TopicsSearch>
        )}
        {/* <TopicChat socket={socket} topicid={topicid} /> */}
      </React.Fragment>
    );
  }
}

export default Topics;
