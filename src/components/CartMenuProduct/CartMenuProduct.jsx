import React, { Component } from 'react'

import plus from '../../assets/plus.svg'
import minus from '../../assets/minus.svg'
import './cartmenuproduct.css'

export default class CartMenuProduct extends Component {
    state = {
        price: this.props.product.prices.find(
            (price) => 
              price.currency.label===this.props.currency.label
            )
    }
// ---------------------------------Set Price According to selected Currency----------------------------------------
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.currency !== this.props.currency) {
        this.setState({
          price: this.props.product.prices.find(
            (price) => 
              price.currency.label===this.props.currency.label
            )
        })
      }
    }
    
    
  render() {
            
    return (
        <div className="cart-product__container">
            <div className="cart-product__right">
                <div className="cart-product__actions">
                    <button className="button-cart" onClick={() => this.props.addToCart(this.props.product)}>
                        <img
                            className="cart-action-icon"
                            src={plus}
                            alt="plus"
                        />
                    </button>
                    <p className="text-primary">
                        {this.props.product.count}
                    </p>
                    <button className="button-cart" onClick={() => this.props.removeFromCart(this.props.product)}>
                        <img
                            className="cart-action-icon"
                            src={minus}
                            alt="minus"
                        />
                    </button>
                </div>
                <div className="product-image-container">
                    <img
                        src={this.props.product.gallery[0]}
                        alt="product"
                    />
                </div>
            </div>
            <div className="cart-product__left">
                <h2 className="text-primary">{this.props.product.brand}</h2>
                <h2 className="text-primary">{this.props.product.name}</h2>
                <h4 className="text-primary">{this.state.price.currency.symbol}{(this.state.price.amount * this.props.product.count).toFixed(2)}</h4>
                {this.props.product.attributes && this.props.product.attributes.map((attribute, i) => (
                    <div className="cart-product__attribute-container" key={i}>
                        <h3>{attribute.name.toUpperCase()}:</h3>
                        <div className="productdetails__info-attribute-options">
                        {attribute.items.map((item, i) => (
                        attribute.type === "text" 
                        ? 
                            <p 
                                key={i}
                                className={`button-cart ${this.props.product.options[attribute.name] === item.value && `button-cart-active`}`}
                            >
                                {item.value}
                            </p> 
                        :                
                            <p 
                                key={i}
                                className={`button-cart-color ${this.props.product.options[attribute.name] === item.value && `button-cart-color-active`}`}
                                style={{backgroundColor: item.value}}> </p>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }
}
