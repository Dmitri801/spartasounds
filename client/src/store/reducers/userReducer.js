import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  RESET_REGISTER,
  ADD_TO_CART,
  GET_ALL_CART_ITEMS_USER,
  RESET_LOGIN
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload
      };
    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: action.payload
      };
    case AUTH_USER:
      return {
        ...state,
        authedUser: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        loginSuccess: {
          loginSuccess: false,
          message: "Please Check Your Information"
        }
      };
    case RESET_LOGIN:
      return {
        ...state
      };
    case RESET_REGISTER:
      return {
        ...state
      };
    case ADD_TO_CART:
      return {
        ...state,
        authedUser: {
          ...state.authedUser,
          cart: action.payload
        }
      };
    case GET_ALL_CART_ITEMS_USER:
      return {
        ...state,
        authedUser: {
          ...state.authedUser,
          cartDetail: action.payload
        }
      };
    default:
      return state;
  }
}
