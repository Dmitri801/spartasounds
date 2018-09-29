import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShopIcon from '@material-ui/icons/Shop';
import CheckMark from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { openCartModal } from "../../../store/actions/modalActions";
import { connect } from "react-redux";

class ViewDetailsBtn extends Component {
  state = {
    checked: false
  };

  renderActionBtn = () => {
    if (this.props.isAuth) {
      let productInCart = false;
    this.props.user.cart.forEach(item => {
      if (item.id === this.props.kitId) {
        productInCart = true;
      }
    });
      if (!productInCart) {
        if (this.state.checked) {
          return (
            <div
              onClick={() => this.onAddToCart()}
              className="shopping_cart_btn_addstate"
            >
              <CheckMark className="cart_checkmark" />
            </div>
          );
        } else {
          return (
            <div
              onClick={() => this.onAddToCart()}
              className="shopping_cart_btn_auth"
            >
              <ShoppingCartIcon className="cart_icon" />
            </div>
          );
        }
      } else {
        if (this.state.checked) {
          return (
            <div
              onClick={() => this.onAddToCart()}
              className="shopping_cart_btn_addstate"
            >
              <CheckMark className="cart_checkmark" />
            </div>
          );
        } else {
          return (
            <div
              onClick={() => this.props.route.push("/user/cart")}
              className="shopping_cart_btn_added"
            >
              <ShopIcon className="cart_icon" />
            </div>
          ); 
        }
      }
    } else {
      return (
        <Tooltip
          TransitionComponent={Zoom}
          title="Log in or Register to purchase"
          placement="top-end"
        >
          <div
            onClick={() => this.props.runAction()}
            className="shopping_cart_btn_nonauth"
          >
            <ShoppingCartIcon className="cart_icon" />
          </div>
        </Tooltip>
      );
    }
  };

  onAddToCart = () => {
    if (!this.state.checked) {
      this.props.runAction();
      this.props.dispatch(openCartModal());
      this.setState({ checked: true });
      setTimeout(() => {
        this.setState({ checked: false });
      }, 5000);
    } else {
      console.log("State is Checked");
    }
  };
  render() {
    const props = this.props;
    return (
      <div className="view_details_btn_container">
        <div onClick={props.viewDetailsClick} className="view_details_btn">
          {props.title}
        </div>
        {this.renderActionBtn()}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  user: users.authedUser
});

export default connect(mapStateToProps)(ViewDetailsBtn);
