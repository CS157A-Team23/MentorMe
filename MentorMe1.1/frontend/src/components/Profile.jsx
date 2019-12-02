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
      const {isOther, otherData} = this.props;
      if (isOther) {
        this.setState({data: otherData, loaded:true});
      }
      else {
        axios.get("/api/users/me", {
          headers: {"x-auth-token": sessionStorage.getItem("authToken")}
        }).then(res => {
          console.log(res.data);
          this.setState({data:res.data, loaded:true});
          }).catch(err => {
          console.log(err.message);
      })
      }
        
    }

    renderRatings() {
      const rating = this.state.data.rating;
      const ratingcount = this.state.data.ratingcount;
      console.log(rating);
      console.log(ratingcount);
      
      if (rating == 1){
        return(
        <Container syle = {{fill: 'gray'}}>
        <Row>
          <Col><p style={{display: 'flex', justifyContent: 'center'}} href = "">{rating}</p></Col>
          <Col><p style={{display: 'flex', justifyContent: 'center'}} href = "">{ratingcount} Ratings</p></Col>
        </Row>
        </Container>
        );
      }
      else if (rating > 1){
        return(
        <Container syle = {{fill: 'gray'}}>
        <Row>
          <Col><p style={{display: 'flex', justifyContent: 'center'}} href = "">{rating}</p></Col>
          <Col><p style={{display: 'flex', justifyContent: 'center'}} href = "">{ratingcount} Rating</p></Col>
        </Row>
        </Container>
        );
      }
      else{
        return(
          <Container style = {{fill: 'gray'}}>
          <Row>
              <Col><p style={{display: 'flex', justifyContent: 'center'}} href = "">0.00</p></Col>
              <Col><p style={{display: 'flex', justifyContent: 'center'}} href = "">No Ratings</p></Col>
          </Row>
          </Container>
        );
      }
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
              <Container>
              {this.renderRatings()}
              </Container>
             </React.Fragment>
             )
             : (<div className="spinner-border spinner-border-xl" role="status"></div>)}
             
              
          </Container>
      );
    }
}


export default Profile;