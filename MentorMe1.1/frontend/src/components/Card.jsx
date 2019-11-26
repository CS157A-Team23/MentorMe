import React, { Component } from "react";
import axios from "axios";

const Card = props => {
  const { topic, onSetTopic, onToggleInterest } = props;
  const { name, interested, topicid } = topic;
  return (
    <div className="card  mx-2">
      <div
        className="jumbotron text-center btn-outline-primary"
        onClick={() => onSetTopic(topicid)}
      >
        <h2>{name}</h2>
      </div>
      <footer className="footer text-right mr-2 mb-2">
        <i
          className={interested ? "fa fa-heart text-danger" : "fa fa-heart-o"}
          onClick={() => onToggleInterest(topic)}
        />
      </footer>
    </div>
  );
};

export default Card;
