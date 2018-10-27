import {
  OPEN_NAV_SIDEDRAWER,
  CLOSE_NAV_SIDEDRAWER,
  OPEN_ACCOUNT_DRAWER,
  CLOSE_ACCOUNT_DRAWER
} from "../actions/types";

const initialState = {
  navDrawerOpen: false,
  accountDrawerOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_NAV_SIDEDRAWER:
      return {
        ...state,
        navDrawerOpen: true
      };
    case CLOSE_NAV_SIDEDRAWER:
      return {
        ...state,
        navDrawerOpen: false
      };
    case OPEN_ACCOUNT_DRAWER:
      return {
        ...state,
        accountDrawerOpen: true
      };
    case CLOSE_ACCOUNT_DRAWER:
      return {
        ...state,
        accountDrawerOpen: false
      };
    default:
      return state;
  }
}
