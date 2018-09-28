import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import CheckMark from "@material-ui/icons/Check";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Transition } from "react-spring";
class AddToCartBtn extends Component {
  state = {
    successShowing: false
  };

  onAddToCartClick = () => {
    this.setState({ successShowing: true }, () => {
      this.props.addToCart();
    });
    setTimeout(() => {
      this.setState({ successShowing: false });
    }, 5000);
  };
  render() {
    const props = this.props;
    return (
      <div className="addtocartbtn_container">
        {!props.isAuth ? (
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
        ) : (
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
        )}

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
