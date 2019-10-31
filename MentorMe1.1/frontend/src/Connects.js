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
  maxWidth:100,
}

const tags = {
  background: '#7face6',
  borderRadius: 2,
  color: 'white',
  fontWeight: 'bold',
  padding: '4px 4px',
}


function Connects() {
  return (
    	<Container className = 'fluid border border-1 border-dark'>  
          <Row className='title' style = {title_style}>
            <Col xs = {3}>
              <Image fluid style = {profile_pic} src="https://bit.ly/fcc-relaxing-cat" alt='example profile photo'></Image>
            </Col>
            <Col xs = {8}>
              <Row><h2>Cat Williams</h2></Row>
              <Row><span style={tags}> Machine Learning</span></Row>
            </Col>
          </Row>
      </Container>
  );
}

export default Connects;