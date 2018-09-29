import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  RESET_REGISTER,
  ADD_TO_CART,
  GET_ALL_CART_ITEMS_USER,
  CLEAR_NEW_CART_ITEM,
  REMOVE_CART_ITEM_USER,
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
     let newItemAdded;
     action.payload.forEach(item => {
      newItemAdded = item.id
     })
      return {
        ...state,
        authedUser: {
          ...state.authedUser,
          cart: action.payload
        },
        newItemToCart: newItemAdded
      };
    case GET_ALL_CART_ITEMS_USER:
      return {
        ...state,
        authedUser: {
          ...state.authedUser,
          cartDetail: action.payload
        }
      };
    case CLEAR_NEW_CART_ITEM:
     return {
       ...state,
       newItemToCart: ""
     }
    case REMOVE_CART_ITEM_USER:
     return {
       ...state,
       authedUser: {
         ...state.authedUser,
         cartDetail: action.payload.cartDetail,
         cart: action.payload.cart
       }
     }
    default:
      return state;
  }
}
