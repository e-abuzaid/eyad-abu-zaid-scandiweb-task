import React, { Component } from 'react'

import CartProduct from '../../components/CartProduct/CartProduct'
import './cartpage.css'

export default class CartPage extends Component {
  state = {
    image: 0,
    total: 0,
    price: {
      amount: 0,
      currency: {
        symbol: '$',
        label: 'USD'
      }
    },
  }

  render() {
    return (
      <div className="categories__container">
        <h1 className="cart__heading text-primary">
          CART
        </h1>
        <div className="cartpage-items__container">
          {this.props.cart.items.map((product, i) => (
            <CartProduct 
              key={i}
              removeFromCart={this.props.removeFromCart} 
              addToCart={this.props.addToCart} 
              product={product} 
              currency={this.props.currency} />
          ))}
        </div>
        <div className="cartpage-actions">
          <h2 className="text-primary">Tax 21%: &nbsp; <strong>{this.props.currency.symbol}{(this.props.cart.total * 0.21).toFixed(2)}</strong></h2>
          <h2 className="text-primary">Quantity: <strong>{this.props.cart.count}</strong></h2>
          <h2 className="text-primary">Total: &nbsp; &nbsp; &nbsp; <strong>{this.props.currency.symbol}{(this.props.cart.total * 1.21).toFixed(2)}</strong></h2>
          <button className="button-primary">Order</button>
        </div>
        
      </div>
    )
  }
}
