import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import carticon from '../../assets/cart.svg'
import CartMenuProduct from '../CartMenuProduct/CartMenuProduct';
import './cart.css'

export default class Cart extends Component {
  render() {
    return (
      <div id="cartcont" className="cart-menu__container">
        <div id="cart" className="cart-menu__content modal">
            <h1 className="text-primary"><span>My Bag </span>{this.props.cart.count} items</h1>
            {this.props.cart.count === 0 ?
                <div className="cart-menu__icon">
                    <img
                        src={carticon}
                        alt="cart"
                     />
                    <h2>
                        No Items Yet..
                    </h2>
                    <button className="button-primary">
                        Add Items
                    </button>
                </div>
                : 
                <div className="cart-products__container">
                    {this.props.cart.items.map((product, i) => (
                        <CartMenuProduct
                            product={product}
                            key={i}
                            addToCart={this.props.addToCart}
                            removeFromCart={this.props.removeFromCart}
                            currency={this.props.currency}
                        />
                    ))}
                    <div className="cart-menu__total">
                        <p>Total</p>
                        <p>{this.props.currency.symbol}{this.props.cart.total && this.props.cart.total.toFixed(2)}</p>
                    </div>
                    <div className="cart-menu__buttons">
                        <button className="button-secondary" onClick={this.props.toggleCart}>
                            <Link to="/cart">
                                VIEW BAG
                            </Link>
                        </button>
                        <button className="button-primary" onClick={() => {localStorage.removeItem('cart'); window.location.reload()}}>
                            CHECK OUT
                        </button>
                    </div>
                </div>
            }
        </div>
      </div>
    )
  }
}
