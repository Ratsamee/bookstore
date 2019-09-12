import React, { Component } from 'react';
import { Button, Form, Container, Row, Badge} from "react-bootstrap";
import axios from 'axios';
import * as Constants from './Constant';
import {Link} from 'react-router-dom';

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }
  _handleSubmit(event){
    event.preventDefault();
    const request = {"auth": {"email": this.state.email, "password": this.state.password}};
    axios.post(`${Constants.BASE_URL}/user_token`, request)
      .then(response => {
        let token = "Bearer " + response.data.jwt; 
        localStorage.setItem(Constants.JWT, token);
        return axios.get(`${Constants.BASE_URL}/users/current.json`, {headers: {'Authorization': token}});
      }).then((result) => {
        localStorage.setItem(Constants.USER_ID, result.data.id);
        localStorage.setItem(Constants.FULL_NAME, result.data.full_name);
        this.props.history.push("/");
        window.location.reload();
      }).catch(error => this.setState({errorMessage: "Invaid email or password"}));
  }

  render() {
    return (
      <Container>
        <div className="sub_Container">
          <h1>Sign in</h1>
          <div className="div-sign-in">
            <Row className="justify-content-md-center">
                {
                    this.state.errorMessage ? <Badge variant="danger">{this.state.errorMessage}</Badge> : ''
                }
            </Row>
            <Form onSubmit={this._handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={this._handleChange} value={this.state.email} required maxLength="25" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={this._handleChange} value={this.state.password} required maxLength="25" />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <hr></hr>
          <div className="div-sign-up">
                <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    );
  }
}
