import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Categories from './pages/Categories/Categories'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import CartPage from './pages/CartPage/CartPage'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Modal from './components/Modal/Modal'
import {fetchCategories, fetchCategory, fetchCurrency} from './api/queries'
import './App.css'

export default class App extends Component {

  state = {
    categories: [],
    category: 'all',
    showCart: false,
    cart: {
      items: [],
      count: 0,
      total: 0,
      quantity: 0
    },
    products: [],
    currency: {
      label: 'USD',
      symbol: '$'
    },
    modal: {
      show: false,
      message: ''
    },
    currencies: []
  }

  // ---------------------------------------API Calls----------------------------------------------
  fetchNavbarItems = () => {
    fetchCategories()
    .then((res) => this.setState({...this.state, categories: res.categories}))
  }
  //------------------------------------------------------------------------------------------------
  fetchProducts = () => {
    fetchCategory(
      {
        title: this.state.category
      }
      ).then((res) => (
        this.setState(prevState => ({
          ...prevState,
          products: res.category.products
        }))
        ))
      } 
  //------------------------------------------------------------------------------------------------
  fetchCurrencies = () => {
    fetchCurrency()
      .then((res) => (
        this.setState(prevState => (
          {
            ...prevState,
            currencies: res.currencies
          }
        ))
      ))
  }

  // ---------------------------------------Utility Functions----------------------------------------------  
  updateCategory = (name) => {
    this.setState(prevState => ({
      ...prevState,
      category: name
    }))
    localStorage.setItem('category', name)
  }
//------------------------------------------------------------------------------------------------
  updateCurrency = (name) => {
    this.setState(prevState => ({
      ...prevState,
      currency: name
    }))
  }
//------------------------------------------------------------------------------------------------
  toggleCart = () => {
    this.setState(prevState => ({
      ...prevState,
      showCart: !this.state.showCart
    }))
  }
//------------------------------------------------------------------------------------------------
  showModal = (message) => {
    this.setState(prevState => ({
      ...prevState,
      modal: {
        show: true,
        message: message
      }
    }))
  }
//------------------------------------------------------------------------------------------------
closeModal = () => {
  this.setState(prevState => ({
    ...prevState,
    modal: {
      show: false,
      message: ''
    }
  }))
}

// -------------------------Check if product with exact same selected attributes is selected--------------------------------
  compareObjects = (obj1, obj2) => {
    if (!obj1.options && !obj2.options) {
      return true
    } else if (!obj1.options || !obj2.options) {
      return false
    } else {
      for (const option of Object.keys(obj1.options)) {
        if (obj1.options[option] !== obj2.options[option]) {
          return false
        }
      }
    }
    return true
  }
  // ---------------------------------------Cart Logic Functions----------------------------------------------

  addToCart = (item) => {
    const order = this.state.cart.items.find(e => e.id === item.id && this.compareObjects(e, item))
    const orders = this.state.cart.items
    let orderExists = false
    for (const tempOrder of this.state.cart.items) {
      if (tempOrder.id === item.id && this.compareObjects(tempOrder, item)) {
        orderExists = true
      }
    }
    if (orderExists) {
      const index = orders.findIndex(a => this.compareObjects(a, item))
      orders.splice(index, 1, {...order, count: order.count+1})
      this.setState(prevState => ({
        ...prevState,
        cart: {
          count: this.state.cart.count + 1,
          items: orders
        }
      }))  
    } else {

      this.setState(prevState => ({
        ...prevState,
        cart: {
          count: this.state.cart.count + 1,
          items: [...this.state.cart.items, {...item, count: 1}]
        }
      }))
    }
  }
//------------------------------------------------------------------------------------------------
  removeFromCart = (item) => {
    const order = this.state.cart.items.find(e => e.id === item.id && this.compareObjects(e, item))
    const orders = this.state.cart.items
    const index = orders.findIndex(a => this.compareObjects(a, item))
    if (order.count > 1) {
      orders.splice(index, 1, {...order, count: order.count - 1})
        this.setState(prevState => ({
          ...prevState,
          cart: {
            count: this.state.cart.count - 1,
            items: orders
          }
        }))  
      } else {
        orders.splice(index, 1)
        this.setState(prevState => ({
          ...prevState,
          cart: {
            count: this.state.cart.count - 1,
            items: orders
          }
        }))  
      }
    }
//------------------------------------------------------------------------------------------------
  calculateTotal = () => {
    let total = 0
    for (const item of this.state.cart.items) {
      total += item.prices.filter((price) => {if(price.currency.label===this.state.currency.label){return price} else {return null}})[0].amount * item.count
    }
    this.setState(prevState => ({
      ...prevState,
      cart: {
        ...this.state.cart,
        total: total
      }
    }))
  }

// -----------------------------------Populate State Fields on component mount------------------------------------------

  componentDidMount() {
    this.fetchNavbarItems()
    this.fetchProducts()
    this.fetchCurrencies()
    if (localStorage.getItem('cart')) {
      this.setState(prevState => ({
        ...prevState,
        cart: JSON.parse(localStorage.getItem('cart')),
      }))
    }
    if (localStorage.getItem('category')) {
      this.setState(prevState => ({
        ...prevState,
        category: localStorage.getItem('category'),
      }))
    }
    if (localStorage.getItem('currency')) {
      this.setState(prevState => ({
        ...prevState,
        currency: JSON.parse(localStorage.getItem('currency'))
      }))
    }
  }
// ---------------------------------------Populate State Fields on component update----------------------------------------------

  componentDidUpdate(prevProps, prevState) {
    if(prevState.category !== this.state.category) {
      this.fetchProducts()
    }
    if(prevState.cart !== this.state.cart) {
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    }
    if(prevState.cart.count !== this.state.cart.count) {
      this.calculateTotal()
    }
    if(prevState.currency !== this.state.currency) {
      localStorage.setItem('currency', JSON.stringify(this.state.currency))
      this.calculateTotal()
    }
}
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar
             state={this.state}
             toggleCart={this.toggleCart} 
             updateCategory={this.updateCategory} 
             updateCurrency={this.updateCurrency} 
          />
          <Routes>
            <Route path="/" element={<Categories showModal={this.showModal} addToCart={this.addToCart} currency={this.state.currency} category={this.state.category} products={this.state.products} />} />
            <Route path="/cart" element={<CartPage removeFromCart={this.removeFromCart} addToCart={this.addToCart} currency={this.state.currency} cart={this.state.cart} />} />
            <Route path="/:id" element={<ProductDetails showModal={this.showModal} addToCart={this.addToCart} currency={this.state.currency} />} />
          </Routes>
          {this.state.showCart && (
            <Cart 
              cart={this.state.cart} 
              currency={this.state.currency} 
              addToCart={this.addToCart} 
              removeFromCart={this.removeFromCart} 
              toggleCart={this.toggleCart}
            />
          )}
        </div>
        {this.state.modal.show && 
          <Modal
            message={this.state.modal.message}
            close={this.closeModal}
          />
        }
      </BrowserRouter>
    )
  }
}
