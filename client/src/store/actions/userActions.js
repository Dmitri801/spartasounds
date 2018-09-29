import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  RESET_LOGIN,
  RESET_REGISTER,
  ADD_TO_CART,
  GET_ALL_CART_ITEMS_USER,
  CLEAR_NEW_CART_ITEM,
  REMOVE_CART_ITEM_USER,
  LOGOUT_USER
} from "./types";
import { USERS_API, PRODUCTS_API } from "../utils/misc";

export const loginUser = dataToSubmit => {
  const request = axios
    .post(`${USERS_API}/login`, dataToSubmit)
    .then(res => res.data);
  return {
    type: LOGIN_USER,
    payload: request
  };
};

export const registerUser = dataToSubmit => {
  const request = axios
    .post(`${USERS_API}/register`, dataToSubmit)
    .then(res => res.data);
  return {
    type: REGISTER_USER,
    payload: request
  };
};

export const auth = () => {
  const request = axios
    .get(`${USERS_API}/auth`)
    .then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request
  };
};

export const resetLogin = () => {
  return {
    type: RESET_LOGIN
  };
};

export const resetRegister = () => {
  return {
    type: RESET_REGISTER
  };
};

export const logoutUser = () => {
  const request = axios
    .get(`${USERS_API}/logout`)
    .then(response => response.data);
  return {
    type: LOGOUT_USER,
    payload: request
  };
};

export const addToCart = id => {
  const request = axios
    .post(`${USERS_API}/addToCart?productId=${id}`)
    .then(res => {
      return res.data;
    });
  return {
    type: ADD_TO_CART,
    payload: request
  };
};

export const getAllCartItems = (cartItems, userCart) => {
  const request = axios
    .get(`${PRODUCTS_API}/product_id?id=${cartItems}&type=array`)
    .then(res => {
      userCart.forEach(cartItem => {
        res.data.forEach((product, index) => {
          if (cartItem.id === product._id) {
            res.data[index].quantity = cartItem.quantity;
          }
        });
      });
      return res.data;
    });
  return {
    type: GET_ALL_CART_ITEMS_USER,
    payload: request
  };
};

export const clearNewCartItem = () => {
  return {
    type: CLEAR_NEW_CART_ITEM
  }
}

export const removeCartItemUser = (id) => {
  const request = axios.get(`${USERS_API}/removeFromCart?_id=${id}`)
    .then(res => {
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((detItem, index) => {
          if(item.id === detItem._id) {
            res.data.cartDetail[index].quantity = item.quantity
          }
        })
      })
      return res.data;
    });
    return {
      type: REMOVE_CART_ITEM_USER,
      payload: request
    }
}
