import React, { Component } from 'react';
import Card from './Card';
import {Container, FormGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';

const title_style = {
  padding: 20
};

class TopicsSearch extends Component {
    
    
    state = {
        name: ""
    }
        
    addTopic = async function(cred) {
        const {renderAdditionalTopic} = this.props;
        console.log("entered post");
        console.log(cred)
        await axios.post("/api/topics", cred, {
            headers: {"x-auth-token": sessionStorage.getItem("authToken")}
        }).then(res => {
            console.log("entered success");
            console.log(res.data);
            if(res.status === 200) {
              renderAdditionalTopic();
              this.render();
            }
        }).catch(err => {
            console.log(err.message);
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.addTopic(this.state);
    }

    trackChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }
    
    renderCards = function(){
        const {data, loaded, onSetTopic, onToggleInterest} = this.props;
        const rows = [];
        for (let i = 0; i < data.length; i+=2){
            if (i + 1 >= data.length) {
                rows.push(
                  <div className="row" style={title_style}>
                    <div className="col">
                      <Card
                        topic={data[i]}
                        onSetTopic={onSetTopic}
                        onToggleInterest={onToggleInterest}
                      />
                    </div>
                    <div className="col"></div>
                  </div>
                );
              } else {
                rows.push(
                  <div className="row" style={title_style}>
                    <div className="col">
                      <Card
                        topic={data[i]}
                        onSetTopic={onSetTopic}
                        onToggleInterest={onToggleInterest}
                      />
                    </div>
                    <div className="col">
                      <Card
                        topic={data[i + 1]}
                        onSetTopic={onSetTopic}
                        onToggleInterest={onToggleInterest}
                      />
                    </div>
                  </div>);
            }
        }
        return rows;
    }

  render() {
    const { data, loaded } = this.props;
    return (
      <Container>
        {loaded ? (
          <React.Fragment>
            <form className="form-inline container">
            <input 
                autofocus
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <br></br>
            <Container>
                {this.renderCards()}
                <br></br>
                <div className="row">
                    <div className = "col">
                        <form className="card" onSubmit={this.handleSubmit}>
                            <h1 className="text-center" style={title_style}>Add Topic</h1>
                            <div class="form-group row">
                            <label class="col-sm-2 offset-sm-1"> Topic Name </label>
                            <div class="col-sm-8">
                            <FormGroup controlId="name" bsSize="medium">
                                <FormControl type="name" value={this.state.name} onChange = {this.trackChange}/>
                            </FormGroup>                               
                            </div>
                            </div>
                            <div class="row">
                            <div class="col-sm-8 offset-sm-2">
                                <Button block bsSize="large" type="submit">Add</Button>
                                <br></br>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        
        </React.Fragment>): (<div className="spinner-border spinner-border-xl" role="status"></div>)}
        </Container>  );
    }
}

export default TopicsSearch;
