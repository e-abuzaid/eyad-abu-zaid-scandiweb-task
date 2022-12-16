import React, { Component } from 'react'
import parse from 'html-react-parser'

import { fetchProduct } from '../../api/queries'
import './productdetails.css'

export default class ProductDetails extends Component {

  state = {
    product: {},
    image: {},
    price: {},
    order: {},
  }
  

// -----------------------------------API call to fetch product data------------------------------------------

  fetchData = () => {
    fetchProduct(window.location.href.split('/')[3])
      .then((res) => (
        this.setState(prevState => (
          {
            ...prevState,
            product: res.product,
            image: res.product.gallery[0],
            order: {...res.product, options: []},
            price: res.product.prices.find(
              (price) => 
                price.currency.label===this.props.currency.label
              )
          })
        )
      ))
      .catch((error) => console.log(error.message))
  }

// -----------------------------------Logic for selecting attribute------------------------------------------

  handleAttribute = (e) => {
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...this.state.order,
        options: {
          ...this.state.order.options,
          [e.target.name]: e.target.value
        }
      }
    }))
  }

// -----------------------------------Logic for adding order------------------------------------------

  handleAdd = () => {
    if (Object.keys(this.state.order.options).length !== this.state.product.attributes.length) {
      this.props.showModal(`Please select your preferred attributes`)
    } else {
      this.props.addToCart(this.state.order)
      this.props.showModal(`${this.state.product.name} successfully added to your cart!`)
    }
  }

// -----------------------------------Fetching product data on component mount------------------------------------------

  componentDidMount() {
    this.fetchData()
  }

// -----------------------------------Updating the price when user switches currency------------------------------------------

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currency !== this.props.currency) {
      if (this.state.product.prices) {
        this.setState({
          ...prevState,
          price: this.state.product.prices.find(
            (price) => 
              price.currency.label===this.props.currency.label
            )
          })
      }
    }
}


  render() {
    return (
      <div className="productdetails-container">
        <div className="productdetails-images-container">
          <div className="productdetails-images-options-container">
            {this.state.product.gallery && this.state.product.gallery.map((image, i) => (
              <img
                key={i}
                src={image}
                alt="product-option"
                onClick={() => this.setState(prevState => ({...prevState, image: image}))}
              />
            ))}
          </div>
          <div className="productdetails-images-main-container">
            <img 
              src={this.state.image}
              alt="main-product"
            />
          </div>
        </div>
        <div className="productdetails-info-container">
          <h1 className="text-primary product-brand">{this.state.product.brand}</h1>
          <h2 className="text-primary product-name">{this.state.product.name}</h2>
          <div>
            {this.state.product.attributes && this.state.product.attributes.map((attribute, i) => (
              <div className="productdetails-info-attribute-container" key={i}>
              <h3>
                {attribute.name.toUpperCase()}:
              </h3>
              <div className="productdetails-info-attribute-options">
              { attribute.items.map((item, i) => (
                attribute.type === "text" 
                ? 
                <button 
                  key={i}
                  className={`option-text ${this.state.order.options[attribute.name] === item.value && `option-text-active`}`}
                  name={attribute.name}
                  value={item.value}
                  onClick={(e) => this.handleAttribute(e)}
                >
                  {item.value}
                </button> 
                : 
                <button 
                  key={i}
                  className={`option-color ${this.state.order.options[attribute.name] === item.value && `option-color-active`}`}
                  style={{backgroundColor: item.value}}
                  name={attribute.name}
                  value={item.value}
                  onClick={(e) => this.handleAttribute(e)}
                ></button>
                ))}
              </div>
              </div>
            ))}
            
          </div>
          <h3>PRICE:</h3>
          <h5 className="product-price">{this.state.price.currency && this.state.price.currency.symbol}{this.state.price.amount}</h5>
          <button 
            className="button-primary"
            disabled={!this.state.product.inStock}
            onClick={this.handleAdd}
          >
              ADD TO CART
          </button>
          {!this.state.product.inStock && 
            <p className="out-of-stock-text">
              OUT OF STOCK!
            </p>}
          <div className="productdetails-description">
            {this.state.product.description && parse(this.state.product.description)}
          </div>
        </div>
      </div>

    )
  }
}
