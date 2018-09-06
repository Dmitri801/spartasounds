import { combineReducers } from "redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import userReducer from "./userReducer.js";
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  loginModalOpen: modalReducer,
  users: userReducer,
  toastr: toastrReducer
});

export default rootReducer;
