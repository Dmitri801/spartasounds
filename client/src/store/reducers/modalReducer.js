import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_SAMPLE_MODAL,
  CLOSE_SAMPLE_MODAL,
  OPEN_CART_MODAL,
  CLOSE_CART_MODAL
} from "../actions/types";

const initialState = {
  loginModalOpen: false,
  sampleModalOpen: false,
  userCartModalOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        loginModalOpen: true
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        loginModalOpen: false
      };
    case OPEN_SAMPLE_MODAL:
      return {
        ...state,
        sampleModalOpen: true
      };
    case CLOSE_SAMPLE_MODAL:
      return {
        ...state,
        sampleModalOpen: false
      };
    case OPEN_CART_MODAL:
      return {
        ...state,
        userCartModalOpen: true
      };
    case CLOSE_CART_MODAL:
      return {
        ...state,
        userCartModalOpen: false
      };
    default:
      return state;
  }
}
