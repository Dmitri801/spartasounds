import {
  OPEN_NAV_SIDEDRAWER,
  CLOSE_NAV_SIDEDRAWER,
  CLOSE_ACCOUNT_DRAWER,
  OPEN_ACCOUNT_DRAWER
} from "./types";

export const openNavSideDrawer = () => {
  return {
    type: OPEN_NAV_SIDEDRAWER
  };
};

export const closeNavSideDrawer = () => {
  return {
    type: CLOSE_NAV_SIDEDRAWER
  };
};

export const openAccountSideDrawer = () => {
  return {
    type: OPEN_ACCOUNT_DRAWER
  };
};

export const closeAccountSideDrawer = () => {
  return {
    type: CLOSE_ACCOUNT_DRAWER
  };
};
