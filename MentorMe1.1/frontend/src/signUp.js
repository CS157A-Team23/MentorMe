import React, { Component } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import './signUp.css';
export default class signUp extends Component {
  render() {
    return (
      <form><div>
      </div>
        <form id = "resizeFormSignUp">
        <div class="form-row">
            <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
            </div>
            <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
            </div>
        </div>
        <div class="form-group">
            <label for="inputfName">First Name</label>
            <input type="text" class="form-control" id="inputfName" placeholder="1234 Main St"/>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
            <label for="inputlName">Last Name</label>
            <input type="text" class="form-control" id="inputlName"/>
            </div>
            <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip"/>
            </div>
        </div>
        <div class="form-group">
            <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck"/>
            <label class="form-check-label" for="gridCheck">
                Check me out
            </label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign up</button>
        </form>

      </form>
    );
  }
}