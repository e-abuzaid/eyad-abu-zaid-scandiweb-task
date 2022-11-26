import React, { Component } from 'react'

import ProductCard from '../../components/ProductCard/ProductCard'
import './categories.css'

export default class Categories extends Component {

  render() {
    return (
      <div className="categories__container">
        <h1 className="text-primary categories__heading">
          {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
        </h1>
        <div className="categories-products__container">
          {this.props.products && this.props.products.map((product, i) => (
            <ProductCard
              product={product}
              key={i}
              currency={this.props.currency}
              showModal={this.props.showModal}
              addToCart={this.props.addToCart}
            />
          ))}
        </div>
      </div>
    )
  }
}
