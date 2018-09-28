import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_SAMPLE_MODAL,
  CLOSE_SAMPLE_MODAL,
  OPEN_CART_MODAL,
  CLOSE_CART_MODAL
} from "./types";

export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL
  };
};

export const closeLoginModal = () => {
  return {
    type: CLOSE_LOGIN_MODAL
  };
};

export const openSampleModal = () => {
  return {
    type: OPEN_SAMPLE_MODAL
  };
};

export const closeSampleModal = () => {
  return {
    type: CLOSE_SAMPLE_MODAL
  };
};

export const openCartModal = () => {
  return {
    type: OPEN_CART_MODAL
  };
};

export const closeCartModal = () => {
  return {
    type: CLOSE_CART_MODAL
  };
};
