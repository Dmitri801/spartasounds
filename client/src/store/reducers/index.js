import { combineReducers } from "redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import productReducer from './productReducer';
import userReducer from "./userReducer.js";
import modalReducer from './modalReducer';
import musicPlayerReducer from './musicPlayerReducer';
import audioTrackReducer from './audioTrackReducer';

const rootReducer = combineReducers({
  loginModalOpen: modalReducer,
  users: userReducer,
  products: productReducer,
  musicPlayer: musicPlayerReducer,
  audioTracks: audioTrackReducer,
  toastr: toastrReducer
});

export default rootReducer; 
