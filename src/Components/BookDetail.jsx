import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import * as Constants from './Constant';
import axios from 'axios';
const uuid = require('uuid/v1');

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: {},
        volumn: {},
        authors: [],
        imageLink: {},
        saleInfo: {}
    };
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  componentDidMount() {
    // https://www.googleapis.com/books/v1/volumes/QkKnCwAAQBAJ
    const url = Constants.API_URL+"/"+this.props.match.params.id;
    axios.get(url).then((response)=>{
        const data = response.data;
        this.setState({id: this.props.match.params.id});
        this.setState({volumn: data.volumeInfo});
        this.setState({authors: data.volumeInfo.authors});
        this.setState({imageLink: data.volumeInfo.imageLinks});
        this.setState({saleInfo: data.saleInfo.retailPrice});
    });
  }

  _handleOnClick(){
    if (!localStorage.getItem(Constants.USER_ID)) {
        alert('Please sign in/ sign up.');
        this.props.history.push("/login");
        return;
    }

    const volumn = this.state.volumn;
    const book = {
      id: uuid(),
      bookId: this.state.id,
      cover: volumn.imageLinks.smallThumbnail, 
      title: volumn.title,
      price: this.state.saleInfo.amount,
      currency: this.state.saleInfo.currencyCode
    };

    let cart = [];
    if (localStorage.getItem(Constants.CART)){
    cart = JSON.parse(localStorage.getItem(Constants.CART))
    }
  
    cart.push(book);
  
    // JSON.stringify -- convert object to string (json)
    localStorage.setItem(Constants.CART, JSON.stringify(cart));

    alert("Your book is on cart.");
  }

  render() {
    return (
        <Container>
            <div className="sub_Container">
                <h1>{this.state.volumn.title}</h1>
                <h2>{this.state.volumn.subtitle}</h2>
                <div className="grid">
                    <div>
                        <p> <span className="noItem">Author: </span>  {this.state.authors.join(", ")}</p>
                        <p> <span className="noItem">Publisher: </span> {this.state.volumn.publisher}</p>
                        <p><span className="noItem">Publish date: </span>{this.state.volumn.publishedDate}</p>
                        <p><span className="noItem">Description:</span> </p>
                        <p>{this.state.volumn.description}</p>
                        <div className="div-inline-block">
                            <Button variant="success" onClick={this._handleOnClick}>Add to Cart</Button>
                        </div>
                    </div>
                    <div className="div-inline-block">
                        <img src={this.state.imageLink.small} alt={this.state.volumn.title} />
                        <div className="price">
                            Price: {`${this.state.saleInfo.amount} ${this.state.saleInfo.currencyCode}`}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
  }
}
