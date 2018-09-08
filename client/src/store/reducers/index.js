import { combineReducers } from "redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import productReducer from './productReducer';
import userReducer from "./userReducer.js";
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  loginModalOpen: modalReducer,
  users: userReducer,
  products: productReducer,
  toastr: toastrReducer
});

export default rootReducer;
