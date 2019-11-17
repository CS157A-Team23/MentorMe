import React from 'react';
import {Row, Col} from 'react-bootstrap';


const width = window.innerWidth;

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

const NavBar = (props) => {

	const {onSetPage} = props;
  return (
    	<Row style = {style} className="show-grid">
    		<Col className = "text-center btn-default" style = {btn_style} onClick={()=>onSetPage(0)}>Topics</Col>
  			<Col className = "text-center btn-default" style = {btn_style} onClick={()=>onSetPage(1)}>Connects</Col>
  			<Col className = "text-center btn-default" style = {btn_style} onClick={()=>onSetPage(2)}>Profile</Col>
		</Row>
  );
}

export default NavBar;