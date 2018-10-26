import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

//{"paid":true,"cancelled":false,"payerID":"SAF5ZYZY5WMMJ","paymentID":"PAY-7U112568EK874215NLOZNBFI","paymentToken":"EC-1SX93663T6520545X","returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-7U112568EK874215NLOZNBFI&token=EC-1SX93663T6520545X&PayerID=SAF5ZYZY5WMMJ","address":{"recipient_name":"test buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"email":"dsharsh-buyer@hotmail.com"}//

class PayPal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment);
      console.log(`The Payment Was Succeeded!, ${JSON.stringify(payment)}`);
    };
    const onCancel = data => {
      this.props.onCancel();
    };

    const onError = err => {
      this.props.onError(err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AcEpGSr7h6Y0akMDlP5SCjl7rTJ3qgOdCOAvUvrq6qrznj89owUqCtgwdeZgl_bJ4GX-u2zqlM7KcWwT",
      production: "YOUR-PRODUCTION-APP-ID"
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "responsive",
            color: "black",
            shape: "pill",
            tagline: false
          }}
        />
      </div>
    );
  }
}

export default PayPal;
