import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
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
         ...state
     }
    default:
      return state;
  }
}
