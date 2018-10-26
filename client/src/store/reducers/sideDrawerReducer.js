import { OPEN_NAV_SIDEDRAWER, CLOSE_NAV_SIDEDRAWER } from "../actions/types";

const initialState = {
  navDrawerOpen: false
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
    default:
      return state;
  }
}
