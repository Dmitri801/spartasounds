import {
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SOLD
  } from "../actions/types";
  
  const initialState = {};
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS_BY_SOLD: 
       return {
           ...state,
           bySold: action.payload
       }
      case GET_PRODUCTS_BY_ARRIVAL:
       return {
           ...state,
           byArrival: action.payload
       }
      default:
        return state;
    }
  }