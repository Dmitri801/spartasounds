import { CHANGE_CHECKOUT_STEP, RESET_CHECKOUT } from "../actions/types";

const initialState = {
  step: "cart"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CHECKOUT_STEP:
      return {
        ...state,
        step: action.payload
      };
    case RESET_CHECKOUT:
      return {
        ...state,
        step: "cart"
      };
    default:
      return state;
  }
}
