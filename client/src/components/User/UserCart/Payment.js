import React from "react";
import PayPalBtn from "../../UI/Buttons/PayPalBtn";
import CheckMark from "@material-ui/icons/Check";

const Payment = props => {
  const renderInfoPanel = () => {
    if (props.user.isAuth) {
      return (
        <div className="confirm_info">
          <h1>Email To Send Download</h1>
          <p>
            <span className="checkout_confirm_email">{props.user.email}</span>
            <span
              onClick={() => props.route.push("/user/user_profile")}
              className="change_email_btn"
            >
              Change
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="guest_info">
          <h1>Where Should We Send Your Download?</h1>
        </div>
      );
    }
  };
  return (
    <div className="user_payment">
      <div className="payment_info_container">
        {renderInfoPanel()}
        <div className="payment_options">
          <div className="paypal_btn_container">
            <PayPalBtn
              onError={err => props.onError(err)}
              onCancel={props.onCancel}
              onSuccess={data => props.onSuccess(data)}
              toPay={props.total}
            />
          </div>
        </div>
      </div>
      <div className="about_specs">
        <div className="spec_container">
          <div className="bullet_point">
            <CheckMark />
          </div>
          <div>14 Day Money Back Guarantee</div>
        </div>
        <div className="spec_container">
          <div className="bullet_point">
            <CheckMark />
          </div>
          <div>Instantly Download Your Kit</div>
        </div>
        <div className="spec_container">
          <div className="bullet_point">
            <CheckMark />
          </div>
          <div>Email with questions or support</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
