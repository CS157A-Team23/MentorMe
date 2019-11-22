import React, { Component } from "react";
import axios from 'axios';
import Card from './Card';
import {Container} from 'react-bootstrap'
import TopicsSearch from './TopicsSearch'
import TopicChat from "./TopicChat";

class Topics extends Component {
    state ={
        data:[],
        loaded:false
    }

    componentDidMount() {
        axios.get("/api/topics", {
        }).then(res => {
            console.log(res.data);
            this.setState({data:res.data, loaded:true});
        }).catch(err => {
            console.log(err.message);
        })
    }

    render(){
        const {data, loaded} = this.state;
        const { socket } = this.props;
        const topicid = 1;
        return (
        <React.Fragment>
            <TopicsSearch data={data} loaded={loaded}></TopicsSearch>
            {/* <TopicChat socket={socket} topicid={topicid} /> */}
        </React.Fragment>
            
            );
    }
}

export default Topics;
