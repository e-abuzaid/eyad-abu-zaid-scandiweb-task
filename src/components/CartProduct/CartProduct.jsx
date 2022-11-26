import React, { Component } from 'react'

import plus from '../../assets/plus.svg'
import minus from '../../assets/minus.svg'
import left from '../../assets/leftarrow.svg'
import right from '../../assets/rightarrow.svg'
import './cartproduct.css'

export default class CartProduct extends Component {
  state = {
      image: 0,
  }

// -----------------------------------logic for altering the image with arrows------------------------------------------

  handleImage = (product, mode) => {
        if (mode === 'next') {
          if (this.state.image < product.gallery.length - 1) {
            this.setState(prevState => ({
              ...prevState,
              image: this.state.image + 1,
            }))
          } else {
            this.setState(prevState => ({
              ...prevState,
              image: 0,
            }))
          }
        } else {
          if (this.state.image === 0) {
            this.setState(prevState => ({
              ...prevState,
              image: product.gallery.length - 1,
            }))
          } else {
            this.setState(prevState => ({
              ...prevState,
              image: this.state.image - 1,
            }))
          }
        }
    }


    
  render() {
    return (
        <div className="cartpage-item__container">
        <div className="cartpage-item__left">
          <h1 className="text-primary product-brand">{this.props.product.brand}</h1>
          <h2 className="text-primary product-name">{this.props.product.name}</h2>
          <h3 className="text-primary product-price">{this.props.currency.symbol}{(this.props.product.prices.find(
            (price) => 
              price.currency.label===this.props.currency.label
            ).amount * this.props.product.count).toFixed(2)}</h3>
            <div>
              {this.props.product.attributes && this.props.product.attributes.map((attribute, i) => (
                <div className="productdetails__info-attribute__container" key={i}>
                <h3 className="product-attribute-label">
                  {attribute.name.toUpperCase()}:
                </h3>
                <div className="productdetails__info-attribute-options cartpage-options">
                { attribute.items.map((item, i) => (
                  attribute.type === "text" 
                  ? 
                  <button 
                    className={`option-text-cart ${this.props.product.options[attribute.name] === item.value && `option-text-cart-active`}`}
                    name={attribute.name}
                    value={item.value}
                    key={i}
                  >
                    {item.value}
                  </button> 
                  : 
                  <button 
                    className={`option-color-cart ${this.props.product.options[attribute.name] === item.value && `option-color-cart-active`}`}
                    style={{backgroundColor: item.value}}
                    name={attribute.name}
                    value={item.value}
                    key={i}
                  ></button>
                  ))}
                </div>
                </div>
            ))}

            </div>
        </div>
        <div className="cartpage-item__right">
          <div className="cartpage-images__container">
            <div className="cartbage-item__actions">
                <button className="option-text-cart button-cart" onClick={() => this.props.addToCart(this.props.product)}>
                  <img
                    src={plus}
                    alt="plus-icon"
                  />
                </button>
                <p>
                    {this.props.product.count}
                </p>
                <button className="option-text-cart button-cart" onClick={() => this.props.removeFromCart(this.props.product)}>
                  <img
                    src={minus}
                    alt="minus-icon"
                  />
                </button>
            </div>
            <img
              src={this.props.product.gallery[this.state.image]}
              alt="product-main"
            />
            {this.props.product.gallery.length > 1 && (
              <div className="cartpage-images__actions">
                <button onClick={() => this.handleImage(this.props.product ,'prev')}>
                  <img
                    src={left}
                    alt="previous-icon"
                  />
                </button>
                <button onClick={() => this.handleImage(this.props.product ,'next')}>
                  <img
                    src={right}
                    alt="next-icon"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    )
  }
}
