import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import * as Constants from '../src/Components/Constant'
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
            {localStorage.getItem(Constants.USER_ID)?"":<Navbar.Brand href="#login">Sign In</Navbar.Brand>}
            <Navbar.Brand href="#">Home</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
            {localStorage.getItem(Constants.USER_ID)?<Navbar.Brand href="#cart">Cart</Navbar.Brand>: ""}
            {localStorage.getItem(Constants.USER_ID)?<Navbar.Brand href="#logout">Sign Out</Navbar.Brand>: ""}
        </Navbar>
        
    );
  }
}

export default Navigation;
