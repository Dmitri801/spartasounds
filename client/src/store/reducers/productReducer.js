import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SOLD,
  GET_GENRES,
  GET_CATEGORIES,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SOLD:
      return {
        ...state,
        bySold: action.payload
      };
    case GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };
    case ADD_PRODUCT:
     return {
       ...state,
       newProduct: action.payload
     }
    case CLEAR_PRODUCT: 
     return {
       ...state,
       newProduct: action.payload
     }
    default:
      return state;
  }
}
