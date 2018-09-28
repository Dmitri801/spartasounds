import React, { Component } from "react";
import Modal from "../../UI/Modal";
import CheckMark from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import { closeCartModal } from "../../../store/actions/modalActions";
import { connect } from "react-redux";

class UserCartModal extends Component {
  closeModal = () => {
    this.props.dispatch(closeCartModal());
  };
  render() {
    return (
      <Modal
        closeIcon={this.closeIcon}
        modalName="cartModal"
        modalTitle=""
        modalOpen={this.props.userCartModalOpen}
        titleClassName="login_header"
        onBackDropClick={this.closeModal}
      >
        <div className="cart_modal_container">
          <div className="modal_header">
            <p>
              <CheckMark />
              <span>Added</span>
            </p>
            <div className="link_container">
              <Link to="/user/cart">GO to Cart</Link> /
              <Link to="/user/cart">Keep Shopping</Link>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modals }) => ({
  userCartModalOpen: modals.userCartModalOpen
});

export default connect(mapStateToProps)(UserCartModal);
