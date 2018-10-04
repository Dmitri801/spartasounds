import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import CartProductBlock from "../../UI/Cart/Product_Block";
import CheckoutBtn from "../../UI/Buttons/Checkout";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
const Cart = props => {
  return (
    <div className="user_cart">
      {props.itemsInCart ? (
        <CartProductBlock
          products={props.products}
          location="userCart"
          removeItem={props.removeItem}
        />
      ) : (
        <div>
          <h1>You Don't Have Any Items In Your Cart</h1>
          <div className="frown_container">
            <FontAwesomeIcon icon={faFrown} />
            <CheckoutBtn
              styles={{ width: "500px", fontSize: "3.5rem" }}
              click={() => props.route.push("/shop")}
            >
              Shop
            </CheckoutBtn>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
