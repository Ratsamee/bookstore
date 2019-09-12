import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from './Constant';
import {Link} from 'react-router-dom';
import {Container, Button, FormControl} from 'react-bootstrap';
const uuid = require('uuid/v1');

export default class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(query){
    const url = Constants.API_URL;
    const criteria = `q=title:${query}`

    axios.get(url,{
        params: {
            q: criteria.toLowerCase()
        }
    }).then((response)=>{
        const data = response.data.items.filter((x) => x.saleInfo.saleability === Constants.FOR_SALE);
        this.setState({data: data});
    });
  }

  _addToCart = (book) => {
    if (!localStorage.getItem(Constants.USER_ID)) {
      alert('Please sign in/ sign up.');
      this.props.history.push("/login");
      return;
    }

    let cart = [];
    if (localStorage.getItem(Constants.CART)){
      cart = JSON.parse(localStorage.getItem(Constants.CART))
    }

    console.log('cart:', cart);
    cart.push(book);

    // JSON.stringify -- convert object to string (json)
    localStorage.setItem(Constants.CART, JSON.stringify(cart));

    alert("Your book is on cart.")
  }

  render() {
    return (
      <Container>
        <div className="sub_Container">
          <h1>Search books</h1>
            <SearchBookForm onSubmit={this.fetchData} />
              { this.state.data ? <ShowSearchResult info={this.state.data} onSubmit={this._addToCart} /> : ""}
        </div>
      </Container>
    );
  }
}

class AddCart extends Component{
  constructor(props){
    super(props);
    this.state = {
      book: props.data
    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    const volumn = this.state.book.volumeInfo;
    const book = {
      id: uuid(),
      bookId: this.state.book.id,
      cover: volumn.imageLinks.smallThumbnail, 
      title: volumn.title,
      price: this.state.book.saleInfo.retailPrice.amount,
      currency: this.state.book.saleInfo.retailPrice.currencyCode
    };
    this.props.onSubmit(book);
  }

  render(){
    return (
      <form onSubmit={this._handleSubmit}>
        <Button type="submit" variant="success">Add to Cart</Button>
      </form>
    );
  }
}
const ShowSearchResult = (props) => {
      return(
        <div className="content">
            {
              props.info.map((book, index)=>{
                return(
                  <div key={index} className="div-card">
                    <div className="div-card-bg">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                            <Link to={`/bookdetail/${book.id}`}>
                            <img className="img-cover" src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
                            </Link>
                            </td>
                            <td>{book.volumeInfo.title}</td>
                          </tr>
                          <tr>
                            <td className="price"><p>${book.saleInfo.retailPrice.amount}</p></td>
                            <td><AddCart data={book} onSubmit={props.onSubmit}  /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            }
        </div>
    );
}


class SearchBookForm extends Component {
  constructor() {
    super();
    this.state = {
        query: ''
    };
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInput(event){
    this.setState({
        query: event.target.value
    });
  }
  _handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  render() {
    return (
        <div >
            <form onSubmit={this._handleSubmit}>
              <table className="search-center">
                <tbody>
                  <tr>
                    <td className="search-center-text"> <FormControl type="text" placeholder="please type title or author" className="mr-sm-2 " onChange={this._handleInput} autoFocus /> </td>
                    <td>
                    <Button type="submit" variant="success">Search</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
        </div>
    );
  }
}