import React, { Component } from "react";
import UserLayout from "..";
import {
  getAllCartItems,
  removeCartItemUser,
  onSuccessPurchase
} from "../../../store/actions/userActions";
import CheckoutBtn from "../../UI/Buttons/Checkout";
import Cart from "./Cart";
import Payment from "./Payment";
import BackArrowBtn from "../../UI/Buttons/BackBtn";
import {
  resetCheckout,
  changeCheckoutStep
} from "../../../store/actions/cartActions";
import Spinner from "../../UI/Spinner";
import { connect } from "react-redux";
const userDashboardBackground = require("../../../resources/Images/user-dashboard-background.jpeg");

class UserCart extends Component {
  state = {
    loading: true,
    itemsInCart: false,
    total: 0,
    page: 1
  };

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;
    this.setState({ loading: false });
    if (user.cart) {
      if (user.cart.length > 0) {
        user.cart.forEach(item => {
          cartItem.push(item.id);
        });
        this.setState({ itemsInCart: true });
        this.props.dispatch(getAllCartItems(cartItem, user.cart)).then(res => {
          this.setState({ total: this.calculateTotalCost() });
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetCheckout());
  }

  transactionError = err => {
    console.log("paypal error", err);
  };
  transactionCanceled = () => {
    console.log("transaction canceled");
  };
  transactionSuccess = data => {
    this.setState({ loading: true });
    this.props
      .dispatch(
        onSuccessPurchase({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({ itemsInCart: false, total: 0 });
          setTimeout(() => {
            this.setState({ loading: false }, () =>
              this.props.dispatch(changeCheckoutStep("download"))
            );
          }, 2000);
        }
      });
  };

  calculateTotalCost = () => {
    let total = 0;
    if (this.props.user && this.props.user.cartDetail) {
      this.props.user.cartDetail.forEach(item => {
        total += item.price;
      });
      return total;
    }
  };

  removeFromCart = id => {
    this.props.dispatch(removeCartItemUser(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({ itemsInCart: false });
      } else {
        this.setState({ total: this.calculateTotalCost() });
      }
    });
  };

  renderStepPage = () => {
    const { step } = this.props;
    if (step === "cart") {
      return (
        <Cart
          itemsInCart={this.state.itemsInCart}
          products={this.props.user.cartDetail}
          removeItem={this.removeFromCart}
          route={this.props.history}
        />
      );
    } else if (step === "payment") {
      return (
        <Payment
          onSuccess={data => this.transactionSuccess(data)}
          onError={err => this.transactionError(err)}
          onCancel={this.transactionCanceled}
          user={this.props.user}
          total={this.state.total}
          route={this.props.history}
        />
      );
    } else if (step === "download") {
      return <div>download</div>;
    }
  };

  renderHeader = () => {
    const { step } = this.props;
    if (step === "cart") {
      return (
        <div className="cart_header">
          <h1>Shopping Cart</h1>
        </div>
      );
    } else if (step === "payment") {
      return (
        <div className="cart_header">
          <h1>Payment Information</h1>
        </div>
      );
    } else if (step === "download") {
      return (
        <div className="cart_header">
          <h1>Download Now</h1>
        </div>
      );
    }
  };

  renderBottomContainer = () => {
    const { step } = this.props;
    if (step === "cart") {
      return (
        <div className="cart_bottom_container">
          {this.state.itemsInCart && <h1>Total: ${this.state.total}</h1>}
          {this.state.itemsInCart && (
            <CheckoutBtn
              click={() => this.props.dispatch(changeCheckoutStep("payment"))}
            >
              Checkout
            </CheckoutBtn>
          )}
        </div>
      );
    } else if (step === "payment") {
      return (
        <div className="payment_bottom_container">
          <BackArrowBtn
            title="Cart"
            click={() => this.props.dispatch(changeCheckoutStep("cart"))}
          />
          <h1 className="totalText">Total: ${this.state.total}</h1>
        </div>
      );
    }
  };
  changeStepToPayment = () => {
    if (this.props.step !== "payment") {
      this.props.dispatch(changeCheckoutStep("payment"));
    }
  };
  changeStepToCart = () => {
    if (this.props.step !== "cart") {
      this.props.dispatch(changeCheckoutStep("cart"));
    }
  };

  render() {
    const { step } = this.props;
    let highlightStyle = {};
    if (step === "payment") {
      highlightStyle = { transform: `translateX(110%)` };
    } else if (step === "download") {
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
        <div className="cart_container">
          <div className="cart_main_card">
            <div className="checkout_steps">
              <h1 style={{ cursor: "pointer" }} onClick={this.changeStepToCart}>
                <span
                  style={step === "cart" ? { backgroundColor: "#ca3726" } : {}}
                  className="one"
                >
                  1
                </span>
                Your Order
              </h1>
              <h1>
                <span
                  style={
                    step === "payment" ? { backgroundColor: "#ca3726" } : {}
                  }
                  className="two"
                >
                  2
                </span>
                Payment
              </h1>
              <h1>
                <span
                  style={
                    step === "download" ? { backgroundColor: "#ca3726" } : {}
                  }
                >
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

            {this.state.loading ? (
              <Spinner specialClassName="cart_spinner" />
            ) : (
              this.renderHeader()
            )}
            {this.state.loading ? (
              <Spinner specialClassName="cart_spinner" />
            ) : (
              this.renderStepPage()
            )}
            {this.state.loading ? (
              <Spinner specialClassName="cart_spinner" />
            ) : (
              this.renderBottomContainer()
            )}
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ users, userCart }) => ({
  user: users.authedUser,
  step: userCart.step
});

export default connect(mapStateToProps)(UserCart);
