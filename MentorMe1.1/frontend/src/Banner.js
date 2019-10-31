import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';


let style = {
  	position: 'fixed',
  	top: 0,
  	margin: '0 auto',
  	width: '100%',
    padding: 20,
    backgroundColor: '#1111',
}

const title = {
   justifyContent: 'center'
}

function Banner() {
  return (
    	<Row className = ' border border-1 border-dark' style = {style}>
        <h1 className = 'center' style={title}>MentorMe</h1>
      </Row>
  );
}

export default Banner;