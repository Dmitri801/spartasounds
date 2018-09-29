import React from 'react'

const CheckoutBtn = (props) => {
  return (
    <div onClick={props.click} style={props.styles} className="checkout_btn">
      {props.children}
    </div>
  )
}

export default CheckoutBtn;
