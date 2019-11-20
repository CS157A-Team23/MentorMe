import React, { Component } from "react";
import axios from 'axios';
import Card from './Card';
import {Container} from 'react-bootstrap'

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
            <Container>
            {loaded ? (<React.Fragment>
            <form className="form-inline" >
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <br></br>
            <Container>
                <div className="row"><div className="col"><Card name={data[0].name}/></div><div className="col"><Card name={data[1].name}/></div></div>
                <div className="row"><div className="col"><Card name={data[2].name}/></div><div className="col"><Card name={data[3].name}/></div></div>
                <div className="row"><div className="col"><Card name={data[4].name}/></div><div className="col"><Card name={data[5].name}/></div></div>
                <div className="row"><div className="col"><Card name={data[6].name}/></div><div className="col"><Card name={data[7].name}/></div></div>
            </Container>
        
        </React.Fragment>): (<div className="spinner-border spinner-border-xl" role="status"></div>)}
        </Container>);
    }
}

export default Topics
// date-fns
//socket.off("event");
