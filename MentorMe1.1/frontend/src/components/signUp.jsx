import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../css/signUp.css";
import Myfunctions from "../userfunctions";
export default class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  trackChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    const { setLogin } = this.props;
    event.preventDefault();
    Myfunctions.postSignUp({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (res.status === 200) {
        setLogin();
      }
    });
  };
  render() {
    return (
      <div className="SignUp">
        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-3"> Email </label>
            <div className="col-sm-8">
              <FormGroup controlId="email" bssize="small">
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.trackChange}
                />
              </FormGroup>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3"> Password </label>
            <div className="col-sm-8">
              <FormGroup controlId="password" bssize="medium">
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.trackChange}
                />
              </FormGroup>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3"> First Name </label>
            <div className="col-sm-8">
              <FormGroup controlId="first_name" bssize="medium">
                <FormControl
                  autoFocus
                  type="first_name"
                  value={this.state.first_name}
                  onChange={this.trackChange}
                />
              </FormGroup>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3"> Last Name </label>
            <div className="col-sm-8">
              <FormGroup controlId="last_name" bssize="medium">
                <FormControl
                  autoFocus
                  type="last_name"
                  value={this.state.last_name}
                  onChange={this.trackChange}
                />
              </FormGroup>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-11">
              <Button block bssize="large" type="submit">
                SignUp
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
