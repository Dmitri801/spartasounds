import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  RESET_LOGIN,
  RESET_REGISTER,
  LOGOUT_USER
} from "./types";
import { USERS_API } from "../utils/misc";

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
