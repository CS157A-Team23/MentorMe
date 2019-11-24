import React, {Component} from 'react';
import axios from 'axios';



 const Card = (props) => {
        const {name, onClick} = props;
        return (
            <div className = 'card jumbotron text-center btn-outline-primary mx-2'>  
             <React.Fragment>
                <div className="col" onClick={onClick}>
                  <div><h2>{name}</h2></div>
              </div>
             </React.Fragment>  
          </div>
      );
};



export default Card;