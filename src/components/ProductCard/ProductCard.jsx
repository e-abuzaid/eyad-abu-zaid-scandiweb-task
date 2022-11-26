import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import carticonwhite from '../../assets/carticonwhite.svg'
import './productcard.css'

export default class ProductCard extends Component {
  state = {
    price: this.props.product.prices.find(
        (price) => 
          price.currency.label===this.props.currency.label
        )
  }
  // ---------------------------------------Cart Button Logic----------------------------------------------
  handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
      if (this.props.product.attributes.length >= 1) {
        this.props.showModal("Please visit the product page to choose your preferred attributes")
    } else {
      this.props.addToCart(this.props.product)
      this.props.showModal(`${this.props.product.name} added to you cart!`)
    }
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
          <Link 
            to={`/${this.props.product.id}`} 
            className="productcard__contaienr"
          >
          <img
              src={this.props.product.gallery[0]}
              alt="product"
              width="365"
              height="338"
              />
          <h4 className="text-primary">
            {this.props.product.brand} {this.props.product.name}
          </h4>
          <h3 className="text-primary">
          {this.state.price.currency.symbol}{this.state.price.amount} 
          </h3>
          <div className="productcard__cart-icon" onClick={(e) => this.handleAdd(e)}>
            <img
              src={carticonwhite}
              alt="cart"
            />
          </div>
          {!this.props.product.inStock && 
              <div className="productcard__outofstock">
                  <h2 className="text-primary">OUT OF STOCK</h2>
              </div>
          }
      </Link>
    )
  }
}
