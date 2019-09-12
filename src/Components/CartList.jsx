import React, { Component } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import * as Constants from './Constant';

export default class CartList extends Component {
  constructor() {
    super();
    this.state = {
        books: []
    };
    this._removeItem = this._removeItem.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount(){
      if (localStorage.getItem(Constants.CART)){
          // load data to this.state.books
          this.setState({
              books: JSON.parse(localStorage.getItem(Constants.CART))
          });
      }
  }

  _removeItem(e) {
    const deleteId = e.target.id;
    let cart = this.state.books;
    if (cart){
        cart = cart.filter(x=> x.id !== deleteId);
        this.setState({books: cart});
    }
    if (cart.length === 0){
        localStorage.setItem(Constants.CART, "");
    }else{
        localStorage.setItem(Constants.CART, JSON.stringify(cart));
    }
  }

  _handleSubmit(e){
    e.preventDefault();
    this.props.history.push("/checkout");
  }

  render() {
    return (
        <Container>
            <div className="sub_Container">
            <h1>Your cart list</h1>
            <form onSubmit={this._handleSubmit}>
                <Table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                        <ShowDetail data={this.state.books} onClick={this._removeItem}/>
                </Table>
                <div>
                    {(this.state.books.length === 0)? "": <Button type="submit" variant="success"  size="lg" block>Check Out</Button>}
                </div>
            </form>
            </div>
        </Container>
    );
  }
}

const ShowDetail = (props) => {
    if (props.data.length > 0){
        return(
            <tbody>
                {
                    props.data.map((b, index)=>(
                        <tr key={index}>
                            <td><img width="80px;" src={b.cover}alt={b.title}/></td>
                            <td><span>{b.title}</span></td>
                            <td><span>{`${b.price} ${b.currency}`}</span></td>
                            <td>
                                <Button id={b.id} variant="danger" onClick={props.onClick}>Delete</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        );
    }else{
        return (
            <tbody><tr><td className="noItem" colSpan="4">No Items...</td></tr></tbody>
        )
    }
}

