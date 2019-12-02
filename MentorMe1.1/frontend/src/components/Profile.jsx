import React, {Component} from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import axios from 'axios';
import TopicChat from './TopicChat';
import TopicsSearch from './TopicsSearch';


const title_style = {
  padding: 20,
  backgroundColor: '#1111',
}

const tags = {
  background: '#7face6',
  borderRadius: 2,
  color: 'white',
  fontWeight: 'bold',
  padding: '4px 6px',
  margin: '3px',
}

class Profile extends Component {
    state ={
        data:{},
        loaded:false,
        activeID: null,
    }


    componentDidMount() {
        axios.get("/api/users/me", {
            headers: {"x-auth-token": sessionStorage.getItem("authToken")}
        }).then(res => {
            console.log(res.data);
            this.setState({data:res.data, loaded:true});
        }).catch(err => {
            console.log(err.message);
        })
    }

    render() {
        
        const {data, loaded, activeID} = this.state;
        const { socket } = this.props;

        return (
            <Container className = 'fluid border border-1 border-dark'>  
             {loaded ? (<React.Fragment>
             <Row className='title' style = {title_style}>
                <Col xs = {8}>
                  <Row><h2>{data.first_name  +" " + data.last_name}</h2></Row>
                  <Row><p><strong>Interests:</strong> {data.interests.map((interest) => <span style ={tags}>{interest.name}</span>)} </p></Row>
                </Col>
              </Row>
              <Row className='border  border-1  border-top' style = {title_style}>
                <Col><a style={{display: 'flex', justifyContent: 'center'}} href = "">2 Ratings</a></Col>
             </Row>
             <br></br>
             </React.Fragment>
             )
             : (<div className="spinner-border spinner-border-xl" role="status"></div>)}
             
              
          </Container>
      );
    }
}


export default Profile;