import { OPEN_NAV_SIDEDRAWER, CLOSE_NAV_SIDEDRAWER } from "./types";

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
