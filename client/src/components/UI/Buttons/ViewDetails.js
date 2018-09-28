import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CheckMark from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { openCartModal } from "../../../store/actions/modalActions";
import { connect } from "react-redux";

class ViewDetailsBtn extends Component {
  state = {
    checked: false
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
    const { checked } = this.state;
    return (
      <div className="view_details_btn_container">
        <div onClick={props.viewDetailsClick} className="view_details_btn">
          {props.title}
        </div>
        {props.isAuth ? (
          <div
            onClick={() => this.onAddToCart()}
            className={
              checked ? "shopping_cart_btn_addstate" : "shopping_cart_btn_auth"
            }
          >
            {checked ? (
              <CheckMark className="cart_checkmark" />
            ) : (
              <ShoppingCartIcon className="cart_icon" />
            )}
          </div>
        ) : (
          <Tooltip
            TransitionComponent={Zoom}
            title="Log in or Register to purchase"
            placement="top-end"
          >
            <div
              onClick={() => props.runAction()}
              className="shopping_cart_btn_nonauth"
            >
              <ShoppingCartIcon className="cart_icon" />
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default connect()(ViewDetailsBtn);
