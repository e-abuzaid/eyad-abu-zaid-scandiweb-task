import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import up from '../../assets/arrowup.svg'
import down from '../../assets/arrowdown.svg'
import logo from '../../assets/logo.svg'
import cart from '../../assets/cart.svg'
import './navbar.css'

export default class Navbar extends Component {
    state = {
        showCurrencies: false,
    }
// ---------------------------------------click handlers----------------------------------------------
    handleClick = (e) => {
        this.props.updateCategory(e.target.value)
    }

    handleCurrencyClick = () => {
        this.setState(prevState => ({
            ...prevState,
            showCurrencies: !prevState.showCurrencies
        }))
    }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-category-buttons">
            {this.props.state.categories.map((category, i) => (
                <button
                    key={i}
                    className={`navbar-category-button ${category.name === this.props.state.category && "navbar-category-button-active"}`}
                    value={category.name}
                    onClick={(e) => this.handleClick(e)}
                >
                    {category.name.toUpperCase()}
                </button>
            ))}
        </div>
        <div className="navbar-logo">
            <Link to="/">
                <img
                    src={logo}
                    alt="logo"
                />
            </Link>
        </div>
        <div className="navbar-utilities">
            <div className="navbar-utilities-button" onClick={this.handleCurrencyClick}>
                <p>
                    {this.props.state.currency.symbol}
                </p>
                {this.state.showCurrencies ?
                    <img
                        src={up}
                        alt="up"
                    />
                : 
                    <img
                        src={down}
                        alt="down"
                    />
                }
            </div>
            <div className="navbar-utilities-button" onClick={this.props.toggleCart}>
                <img
                    src={cart}
                    alt="cart"
                />
                {this.props.state.cart.count > 0 && 
                <div className="cart-count">
                    {this.props.state.cart.count}
                </div>
                }
            </div>
        </div>
        {this.state.showCurrencies && 
        <div className="currency-wrapper" onClick={(e) => {e.stopPropagation(); this.setState(prevState => ({
            ...prevState,
            showCurrencies: false
        }))}}>
            <div className="navbar-currency-menu-container modal">
                <ul>
                    {this.props.state.currencies.map((currency, i) => (
                        <li
                        key={i}
                        onClick={
                            () => {this.props.updateCurrency(currency); 
                                this.setState(prevState => ({
                                    ...prevState,
                                    showCurrencies: false
                                }))}
                            }
                            >
                            {currency.symbol} {currency.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        }
      </div>
    )
  }
}
