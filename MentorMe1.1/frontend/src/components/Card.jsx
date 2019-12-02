import React, { Component } from "react";
import axios from "axios";

class Card extends Component {
  state = {  }

  renderSkill(filled) {
    const max = 5;
    const {onSetSkill} = this.props;
    const ratio = filled / max;
    let color = "orange";
    if (ratio <= 0.2) {
      color = "red";
    } else if (ratio >= 0.6) {
      color = "green";
    }
    const hearts = [];
    for (let i = 1; i <= max; i++) {
      if (i <= filled) {
        hearts.push(
        <i 
          key={i}
          className="fa fa-circle" 
          style={{ color }}
          onClick={() => onSetSkill(i)}
          ></i>);
      } else {
        hearts.push(
        <i 
          key={i}
          className="fa fa-circle-o"
          onClick={() => onSetSkill(i)} 
        ></i>);
      }
    }
    return <span className="ml-1">{hearts}</span>;
  };

  clicked = (num) => {
    console.log(num);
  }

  render() { 
    const { topic, onSetTopic, onToggleInterest, skill } = this.props;
    const { name, interested, topicid } = topic;
    return (
      <div className="card mx-2">
        <div
          className="jumbotron text-center btn-outline-primary"
          onClick={() => onSetTopic(topicid)}
        >
          <h2>{name}</h2>
        </div>
        <footer className="footer text-right mr-2 mb-2">
          <div className="mr-2">{this.renderSkill(skill ? skill : 0)}</div>
          
          <i
            className={interested ? "fa fa-heart text-danger" : "fa fa-heart-o"}
            onClick={() => onToggleInterest(topic)}
          />
        </footer>
      </div>
    );
  }
}
 
export default Card;




