import React, { Component } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import * as Constants from './Constant';
import Card from './CreditCard/CreditCard';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
        books: [],
        order_id: 0
    };
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

  _handleSubmit() {
    const order_data = {
        user_id: Number(localStorage.getItem(Constants.USER_ID)),
        order_date: new Date().toISOString().slice(0,10)
    }
    const headerOption = {headers: {'Authorization': localStorage.getItem(Constants.JWT)}};
    axios.post(`${Constants.BASE_URL}/orders.json`, order_data,headerOption ).then((response)=>{
        const order = response.data;
        this.setState({order_id: order.id});
        this.state.books.forEach(x => {
            const order_detail = {
                order_id: order.id,
                book_id: x.bookId,
                price: x.price,
                cover_image: x.cover
            }
            axios.post(`${Constants.BASE_URL}/order_details.json`, order_detail, headerOption)
        });
    }).then(() => {
        localStorage.removeItem(Constants.CART);
        alert(`done, order id: ${this.state.order_id}`);
        this.props.history.push("/");
    }).catch(error=> console.error(error)  );
  }

  render() {
    return (
        <Container>
            <div className="sub_Container">
            <h1>CheckOut</h1>
            <Table >
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.books.map((b, index)=>
                            <tr key={index}>
                                <td><span>{b.title}</span></td>
                                <td><span>{"$" + b.price}</span></td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td  className="price">Total</td>
                        <td className="price">
                            {
                                "$"+this.state.books.map(b=> b.price).reduce((a,b)=> a+b,0).toFixed(2)
                            }
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <Card/>
            <Button onClick={this._handleSubmit} variant="success"  size="lg" block>Checkout</Button>
            </div>
        </Container>
    );
  }
}

export default Checkout;
