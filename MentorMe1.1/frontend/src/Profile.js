import React from 'react';
import './App.css';
import {Container, Row, Col, Image, Button} from 'react-bootstrap'



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
  padding: '2px 4px',
}

function Profile() {
  return (
      
    	<Container className = 'fluid border border-1 border-dark'>  
          <Row className='title' style = {title_style}>
            <Col xs = {4}>
              <Image fluid style = {profile_pic} src="https://bit.ly/fcc-relaxing-cat" alt='example profile photo'></Image>
            </Col>
            <Col xs = {8}>
              <Row><h2>Cat Williams</h2></Row>
              <Row><p><strong>About:</strong> Software Developer</p></Row>
              <Row><p><strong>Skills:</strong> <span style={tags}> Machine Learning</span> <span style={tags}>Networking</span></p></Row>
              <Row><Button>Edit Profile</Button></Row>
            </Col>
          </Row>
          <Row className='border  border-1  border-top' style = {title_style}>
            <Col><p className='text-center'>San Jose, Ca</p></Col>
            <Col><a style={{display: 'flex', justifyContent: 'center'}} href = "">5 mentees</a></Col>
            <Col><a style={{display: 'flex', justifyContent: 'center'}} href = "">2 Ratings</a></Col>
          </Row>
      </Container>
  );
}

export default Profile;