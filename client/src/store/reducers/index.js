import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import productReducer from "./productReducer";
import userReducer from "./userReducer.js";
import modalReducer from "./modalReducer";
import musicPlayerReducer from "./musicPlayerReducer";
import audioTrackReducer from "./audioTrackReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  modals: modalReducer,
  users: userReducer,
  products: productReducer,
  musicPlayer: musicPlayerReducer,
  audioTracks: audioTrackReducer,
  tester: testReducer,
  toastr: toastrReducer
});

export default rootReducer;
