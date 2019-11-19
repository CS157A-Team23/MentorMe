import React, {Component} from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import axios from 'axios';


const title_style = {
  padding: 20,
  backgroundColor: '#1111',
}

const profile_pic = {
  borderRadius: 100,
  boxSizing: 'fluid',
  padding: 5,
  borderColor: 'black',
  width: '100%',
  maxWidth:200
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
        loaded:false
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
        const {data, loaded} = this.state;
        return (
            <Container className = 'fluid border border-1 border-dark'>  
             {loaded ? (<React.Fragment>
             <Row className='title' style = {title_style}>
                <Col xs = {4}>
                  <Image fluid style = {profile_pic} src="https://bit.ly/fcc-relaxing-cat" alt='example profile photo'></Image>
                </Col>
                <Col xs = {8}>
                  <Row><h2>{data.first_name  +" " + data.last_name}</h2></Row>
                  <Row><p><strong>About:</strong> Software Developer</p></Row>
                  <Row><p><strong>Interests:</strong> {data.interests.map((interest) => <span style ={tags}>{interest.name}</span>)} </p></Row>
                  <Row><Button>Edit Profile</Button></Row>
                </Col>
              </Row>
              <Row className='border  border-1  border-top' style = {title_style}>
                <Col><p className='text-center'>San Jose, Ca</p></Col>
                <Col><a style={{display: 'flex', justifyContent: 'center'}} href = "">5 mentees</a></Col>
                <Col><a style={{display: 'flex', justifyContent: 'center'}} href = "">2 Ratings</a></Col>
             </Row>
             </React.Fragment>)
             : (<div className="spinner-border spinner-border-xl" role="status"></div>)}
              
          </Container>
      );
    }
}


export default Profile;