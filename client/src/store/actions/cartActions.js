import { CHANGE_CHECKOUT_STEP, RESET_CHECKOUT } from "./types";

export const changeCheckoutStep = step => {
  return {
    type: CHANGE_CHECKOUT_STEP,
    payload: step
  };
};

export const resetCheckout = () => {
  return {
    type: RESET_CHECKOUT
  };
};
