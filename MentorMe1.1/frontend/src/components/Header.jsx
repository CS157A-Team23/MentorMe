import React, { Component } from "react";
import {Row, Col} from "react-bootstrap";

const Header = (props) => {
    const {onSetPage} = props;
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">MentorMe</a>
        <button className = "text-center btn btn-outline-primary mx-2"  onClick={()=>onSetPage(0)}>Topics</button>
  	    <button className = "text-center btn btn-outline-primary mx-2"  onClick={()=>onSetPage(1)}>Connects</button>
  		<button className = "text-center btn btn-outline-primary mx-2"  onClick={()=>onSetPage(2)}>Profile</button>
    </nav>);
}

export default Header
// date-fns
//socket.off("event");
