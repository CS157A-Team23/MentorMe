import React, { Component } from "react";
import axios from 'axios';
import Card from './Card';
import {Container} from 'react-bootstrap'
import TopicsSearch from './TopicsSearch'

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
        return (
            <TopicsSearch data={data} loaded={loaded}></TopicsSearch>
            );
    }
}

export default Topics
// date-fns
//socket.off("event");
