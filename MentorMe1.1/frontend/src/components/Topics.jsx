import React, { Component } from "react";
import axios from 'axios';
import Card from './Card';
import {Container} from 'react-bootstrap'
import TopicsSearch from './TopicsSearch'
import TopicChat from "./TopicChat";

class Topics extends Component {
    state ={
        data:[],
        loaded:false,
        activeID:null
    }
    


    handleSetTopic= (topicid)=>{
        this.setState({activeID:topicid});
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
        const {data, loaded, activeID} = this.state;
        const { socket } = this.props;
        return (
        <React.Fragment>
            {activeID?<TopicChat socket={socket} topicid={activeID} onSetTopic={id=>this.handleSetTopic(id)}/> 
            :<TopicsSearch data={data} loaded={loaded} onSetTopic={id=>this.handleSetTopic(id)}></TopicsSearch>}
            
            {/* <TopicChat socket={socket} topicid={topicid} /> */}
        </React.Fragment>
            
            );
    }
}

export default Topics;
