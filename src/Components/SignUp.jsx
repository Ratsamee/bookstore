import React, { Component } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import axios from 'axios';
import * as Constants from './Constant';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        full_name: '',
        address: '',
        shipping_address: '',
        email: '',
        password: ''
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
    
    // const headerOption = {headers: {'Authorization': localStorage.getItem(Constants.JWT)}};
    axios.post(`${Constants.BASE_URL}/users.json`, this.state).then((response) => {
        localStorage.setItem(Constants.FULL_NAME, response.data.full_name);
        localStorage.setItem(Constants.USER_ID, response.data.user_id);
        const request = {"auth": {"email": this.state.email, "password": this.state.password}};
        return axios.post(`${Constants.BASE_URL}/user_token`, request)
    })
    .then((result)=>{
        let token = "Bearer " + result.data.jwt;
        localStorage.setItem(Constants.JWT, token);
        this.props.history.push("/");
        window.location.reload();
    })
    .catch(error=> console.error('Throw ex:', error))
    // .catch(error => this.setState({errorMessage: "Invaid email or password"}));
  }

  render() {
    return (
        <Container>
            <div className="sub_Container">
            <h1>Sign Up</h1>
                <div className="div-sign-in">
                    <Form onSubmit={this._handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" name="full_name" onChange={this._handleChange} value={this.state.full_name}  required maxLength="40"  />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" name="address" onChange={this._handleChange} value={this.state.address} required maxLength="200" />
                        </Form.Group>
                        <Form.Group controlId="formShippingAddress">
                            <Form.Label>Shipping Address</Form.Label>
                            <Form.Control type="text" placeholder="Shipping Address" name="shipping_address" onChange={this._handleChange} value={this.state.shipping_address} required maxLength="200" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this._handleChange} value={this.state.email} required maxLength="25"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this._handleChange} value={this.state.password} required maxLength="25"/>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
  }
}
