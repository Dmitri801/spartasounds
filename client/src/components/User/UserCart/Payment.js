import React from "react";
import PayPalBtn from "../../UI/Buttons/PayPalBtn";
import CheckMark from "@material-ui/icons/Check";

const Payment = props => {
  return (
    <div className="user_payment">
      <div className="payment_options">
        <div className="paypal_btn_container">
          <PayPalBtn
            onError={err => props.onError(err)}
            onCancel={props.onCancel}
            onSuccess={data => props.onSuccess(data)}
            toPay={props.total}
          />
        </div>
        <div className="stripe_container">
          <form action="your-server-side-code" method="POST">
            <script
              src="https://checkout.stripe.com/checkout.js"
              className="stripe-button"
              data-key="pk_test_FLrTk0GeFw35rr6jWPunButY"
              data-amount="999"
              data-name="Demo Site"
              data-description="Widget"
              data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
              data-locale="auto"
            />
          </form>
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
