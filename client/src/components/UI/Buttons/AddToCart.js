import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
const AddToCartBtn = props => {
  return (
    <div>
      {!props.isAuth ? (
        <Tooltip
          TransitionComponent={Zoom}
          title="Log in or Register to purchase"
          placement="top-end"
        >
          <Button 
            disableRipple
            className="add_to_cart_btn_unauth"
            variant="outlined"
          >
            <ShoppingCartIcon className="cart_icon" />
            Add To Cart
          </Button>
        </Tooltip>
      ) : (
        <Button
          disableRipple
          className="add_to_cart_btn"
          color="inherit"
          variant="outlined"
        >
          <ShoppingCartIcon className="cart_icon" />
          Add To Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartBtn;
