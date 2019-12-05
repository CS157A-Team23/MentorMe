import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../css/Login.css";
import Myfunctions from "../userfunctions";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    event.preventDefault();
    Myfunctions.postLogin({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (res.status === 200) {
        this.props.setLogin();
      }
    });
  };

  render() {
    return (
      <div className="Login">
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
            <div className="col-sm-11">
              <Button
                block
                bssize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
