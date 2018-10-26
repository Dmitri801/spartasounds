import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import productReducer from "./productReducer";
import userReducer from "./userReducer.js";
import modalReducer from "./modalReducer";
import musicPlayerReducer from "./musicPlayerReducer";
import audioTrackReducer from "./audioTrackReducer";
import userCartReducer from "./userCartReducer";
import sideDrawerReducer from "./sideDrawerReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  sideDrawer: sideDrawerReducer,
  modals: modalReducer,
  users: userReducer,
  products: productReducer,
  musicPlayer: musicPlayerReducer,
  audioTracks: audioTrackReducer,
  userCart: userCartReducer,
  tester: testReducer,
  toastr: toastrReducer
});

export default rootReducer;
