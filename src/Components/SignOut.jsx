import React, { Component } from 'react';
import * as Constants from './Constant';

export default class SignOut extends Component {
    componentDidMount() {
        localStorage.removeItem(Constants.USER_ID);
        localStorage.removeItem(Constants.FULL_NAME);
        localStorage.removeItem(Constants.CART);
        this.props.history.push("/");
        window.location.reload();
    }

    render() {
        return (
            <div></div>
        );
    }
}

