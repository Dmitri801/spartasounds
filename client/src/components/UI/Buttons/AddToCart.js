import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import CheckMark from "@material-ui/icons/Check";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import CheckoutBtn from "./Checkout";
import { Transition } from "react-spring";
class AddToCartBtn extends Component {
  state = {
    successShowing: false
  };

  renderBtn = () => {
    if (this.props.isAuth) {
      let productInCart = false;
      this.props.user.cart.forEach(item => {
        if (item.id === this.props.kitId) {
          productInCart = true;
        }
      });
      if (!productInCart || this.state.successShowing) {
        return (
          <Button
            disableRipple
            className="add_to_cart_btn"
            color="inherit"
            variant="outlined"
            onClick={this.onAddToCartClick}
          >
            <ShoppingCartIcon className="cart_icon" />
            Add To Cart
          </Button>
        );
      } else {
        return (
          <CheckoutBtn
            click={() => this.props.route.push("/user/cart")}
            styles={{ width: "270px", height: "50px" }}
          >
            <ShopIcon /> ADDED
          </CheckoutBtn>
        );
      }
    } else {
      return (
        <Tooltip
          TransitionComponent={Zoom}
          title="Log in or Register to purchase"
          placement="top-end"
        >
          <Button
            disableRipple
            className="add_to_cart_btn_unauth"
            variant="outlined"
          >
            <ShoppingCartIcon className="cart_icon" />
            Add To Cart
          </Button>
        </Tooltip>
      );
    }
  };

  onAddToCartClick = () => {
    this.setState({ successShowing: true }, () => {
      this.props.addToCart();
    });
    setTimeout(() => {
      this.setState({ successShowing: false });
    }, 2000);
  };
  render() {
    return (
      <div className="addtocartbtn_container">
        {this.renderBtn()}

        <Transition
          from={{ transform: "translateX(270px)" }}
          enter={{ transform: "translateX(0)" }}
          leave={{ transform: "translateX(870px)" }}
        >
          {this.state.successShowing &&
            (styles => (
              <div style={styles} className="cart_success_btn">
                <CheckMark />
              </div>
            ))}
        </Transition>
      </div>
    );
  }
}

export default AddToCartBtn;
