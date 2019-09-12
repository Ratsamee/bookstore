import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SignIn from './Components/Signin';
import BookSearch from './Components/BookSearch';
import Cart from './Components/CartList';
import Checkout from './Components/Checkout';
import SignOut from './Components/SignOut';
import SignUp from './Components/SignUp';
import BookDetail from './Components/BookDetail';
import Navbar from './Navigation';

const Routes = (
    <Router>
        <div>
            <Navbar/>
            <Route exact path="/" component={ BookSearch } />
            <Route exact path="/login" component={ SignIn } /> 
            <Route exact path="/checkout" component={ Checkout } />
            <Route exact path="/cart" component={ Cart } />
            <Route exact path="/logout" component={ SignOut } />
            <Route exact path="/signup" component={ SignUp } />
            <Route exact path="/bookdetail/:id" component={ BookDetail }/>
        </div>
    </Router>
)

export default Routes;