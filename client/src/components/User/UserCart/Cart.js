import React, { Component } from "react";
import UserLayout from "../index";
import { getAllCartItems } from "../../../store/actions/userActions";
import CartProductBlock from "../../UI/Cart/Product_Block";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import { connect } from "react-redux";
const userDashboardBackground = require("../../../resources/Images/user-dashboard-background.jpeg");

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
    step: 1,
    page: 1
  };

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;

    if (user.cart) {
      if (user.cart.length > 0) {
        user.cart.forEach(item => {
          cartItem.push(item.id);
        });
        this.props.dispatch(getAllCartItems(cartItem, user.cart)).then(res => {
          console.log(res);
        });
      }
    }
  }

  renderHighlightStyle = () => {
    let highlightStyle = {};
    if (this.state.step === 2) {
      highlightStyle = { transform: `translateX(100%)` };
    } else if (this.state.step === 3) {
      highlightStyle = { transform: `translateX(210%)` };
    }
    return highlightStyle;
  };

  render() {
    const { step } = this.state;
    let highlightStyle = {};
    if (step === 2) {
      highlightStyle = { transform: `translateX(100%)` };
    } else if (step === 3) {
      highlightStyle = { transform: `translateX(210%)` };
    }
    return (
      <UserLayout>
        <div
          style={{
            background: `url(${userDashboardBackground})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundSize: "cover",
            backgroundPosition: "100px",
            height: "1100px",
            width: "98%",
            zIndex: "0",
            opacity: "0.1"
          }}
          className="bck_overlay"
        />
        <div className="shop_container">
          <div className="cart_main_card">
            <div className="checkout_steps">
              <h1>
                <span
                  style={step === 1 ? { backgroundColor: "#ca3726" } : {}}
                  className="one"
                >
                  1
                </span>
                Your Order
              </h1>
              <h1>
                <span
                  style={step === 2 ? { backgroundColor: "#ca3726" } : {}}
                  className="two"
                >
                  2
                </span>
                Payment
              </h1>
              <h1>
                <span style={step === 3 ? { backgroundColor: "#ca3726" } : {}}>
                  3
                </span>
                Download Now
              </h1>
            </div>
            <div className="hr_container">
              <div className="checkout_hr">
                <div style={highlightStyle} className="hr_highlight" />
              </div>
            </div>
            <div className="cart_header">
              <h1>Shopping Cart</h1>
            </div>
            <div className="user_cart">
              <CartProductBlock
                products={this.props.user.cartDetail}
                location="userCart"
                removeItem={() => this.removeFromCart()}
              />
            </div>
            <div className="checkout_container">
              <h1>Total:</h1>
              <div>Checkout</div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  user: users.authedUser
});

export default connect(mapStateToProps)(UserCart);
