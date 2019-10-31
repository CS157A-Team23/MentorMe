import React from 'react';
import './App.css';
import {Row, Col} from 'react-bootstrap';


const width = window.innerWidth;

const handleClick = () => console.log('clicked');

let style = {
  	color: 'blue',
  	position: 'fixed',
  	bottom: 0,
  	margin: '0 auto',
  	width: '100%',
}

let btn_style = {
	borderColor: 'grey',
	borderWidth: 1,
	borderStyle: 'solid',
}

function NavBar() {
  return (
    	<Row style = {style} className="show-grid">
    		<Col className = "text-center btn-default" style = {btn_style} onClick={handleClick}>Browse</Col>
  			<Col className = "text-center btn-default" style = {btn_style} onClick={handleClick}>Connects</Col>
  			<Col className = "text-center btn-default" style = {btn_style} onClick={handleClick}>Profile</Col>
		</Row>
  );
}

export default NavBar;