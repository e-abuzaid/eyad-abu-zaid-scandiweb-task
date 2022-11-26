import React, { Component } from 'react'

import './modal.css'

export default class Modal extends Component {
  render() {
    return (
      <div className="cart-menu__container modal">
        <div className="modal-container">
            <div className="modal-top">
                <p className="text-primary">
                   <strong onClick={this.props.close}>X</strong>
                </p>
            </div>
            <div className="modal-content">
                <p className="text-primary">
                    {this.props.message}
                </p>
            </div>
        </div>
      </div>
    )
  }
}
