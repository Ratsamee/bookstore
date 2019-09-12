import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div>
            <h1>Home Page</h1>
            <p><Link to="/login">Sign In</Link> </p>
        </div>
    );
  }
}
