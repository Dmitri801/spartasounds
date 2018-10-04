import React, { Component } from "react";
import Modal from "../../UI/Modal";
import CheckMark from "@material-ui/icons/Check";
import CartProductBlock from "../../UI/Cart/Product_Block";
import CheckoutBtn from "../../UI/Buttons/Checkout";
import Spinner from "../../UI/Spinner";
import { Link, withRouter } from "react-router-dom";
import { closeCartModal } from "../../../store/actions/modalActions";
import {
  getAllCartItems,
  clearNewCartItem
} from "../../../store/actions/userActions";
import { changeCheckoutStep } from "../../../store/actions/cartActions";
import { connect } from "react-redux";

class UserCartModal extends Component {
  state = {
    newItemInCart: [],
    loading: true
  };
  closeModal = () => {
    this.props.dispatch(closeCartModal());
  };

  onModalEnter = () => {
    setTimeout(() => {
      let cartItem = [];
      let user = this.props.user;
      if (user.cart) {
        if (user.cart.length > 0) {
          user.cart.forEach(item => {
            cartItem.push(item.id);
          });
          this.props
            .dispatch(getAllCartItems(cartItem, user.cart))
            .then(res => {
              let newItem;
              newItem = res.payload.filter(
                item => item._id === this.props.itemToCartId
              );
              this.setState({ newItemInCart: newItem }, () =>
                this.setState({ loading: false })
              );
            });
        }
      }
    }, 500);
  };

  onModalLeave = () => {
    this.props.dispatch(clearNewCartItem());
    this.setState({ newItemInCart: "", loading: true });
  };

  onCheckoutClick = () => {
    this.props.dispatch(changeCheckoutStep("payment"));
    this.props.history.push("/user/cart");
    this.closeModal();
  };

  render() {
    return (
      <Modal
        closeIcon={this.closeIcon}
        onEnter={() => this.onModalEnter()}
        onExited={() => this.onModalLeave()}
        modalName="cartModal"
        modalTitle=""
        modalOpen={this.props.userCartModalOpen}
        onBackDropClick={this.closeModal}
      >
        <div className="cart_modal_container">
          <div className="modal_header">
            <p>
              <CheckMark />
              <span>Added</span>
            </p>
            <div className="link_container">
              <Link onClick={() => this.closeModal()} to="/user/cart">
                Go to Cart
              </Link>{" "}
              /<a onClick={() => this.closeModal()}>Keep Shopping</a>
            </div>
          </div>
          <div className="cart_block_container">
            {this.state.loading ? (
              <Spinner specialClassName="modal_cart_spinner" />
            ) : (
              <CartProductBlock
                location="cartModal"
                products={this.state.newItemInCart}
              />
            )}
          </div>
          {!this.state.loading && (
            <div className="checkout_btn_container">
              <CheckoutBtn click={this.onCheckoutClick}>
                Checkout Now
              </CheckoutBtn>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modals, users }) => ({
  userCartModalOpen: modals.userCartModalOpen,
  user: users.authedUser,
  itemToCartId: users.newItemToCart
});

export default connect(mapStateToProps)(withRouter(UserCartModal));
