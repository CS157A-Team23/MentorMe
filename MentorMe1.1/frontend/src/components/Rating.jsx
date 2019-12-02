import React, { Component } from "react";
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
 
class Rating extends Component {
  constructor() {
    super();
 
    this.state = {
      rating: 1
    };

  }
 
  onStarClick(nextValue, prevValue, name) {
      console.log(nextValue);
    this.setState({rating: nextValue});
  }
 
  render() {
    const { rating } = this.props;
    
    return (                
      <div>
        <h2>{}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating ? rating:0}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
 
export default Rating;