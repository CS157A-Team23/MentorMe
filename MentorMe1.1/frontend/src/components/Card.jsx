import React, {Component} from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import axios from 'axios';


const title_style = {
  padding: 20,
  backgroundColor: '#1111',
}

 const Card = (props) => {
        const {name} = props;
        return (
            <Container className = 'fluid border border-1 border-dark'>  
             <React.Fragment>
             <div className='row title' style = {title_style}>
                <div className="col" xs = {8}>
                  <div><h2>{name}</h2></div>
                </div>
              </div>
             </React.Fragment>  
          </Container>
      );
};



export default Card;