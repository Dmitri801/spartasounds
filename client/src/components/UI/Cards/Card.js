import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
const imageComingSoon = require('../../../resources/Images/coming_soon.png');
class Card extends Component {

    renderCardImage = (images) => {
        if(images.length > 0) {
            return images[0].url
        } else {
            return imageComingSoon;
        }
    }
  render() {
      const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
        className="image"
        style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
        }}
        >
        </div>
        <div className="action_container">
             <div className="tags">
              <div className="name">
               {props.name}
              </div>
               <div className="genre">
                {props.genre.name}
               </div>
                <div className="price">
                ${props.price}
                </div>
                <hr />
                <Button disableRipple  className={props.isAuth ? "add_to_cart_btn" : "add_to_cart_btn_unauth"} color={props.isAuth ? "inherit" : null} variant="outlined">
                <ShoppingCartIcon className="cart_icon" />
                Add To Cart
                </Button>
             </div>
            </div>
      </div>
    )
  }
}



export default Card
