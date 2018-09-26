import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SOLD,
  GET_GENRES,
  GET_CATEGORIES,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  ADD_GENRE,
  ADD_CATEGORY,
  GET_PRODUCT_DETAIL,
  CLEAR_CATEGORY,
  CLEAR_GENRE,
  CLEAR_PRODUCT,
  REMOVE_PRODUCT
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
        toShopSize: action.payload.size
      };
    case ADD_PRODUCT:
      return {
        ...state,
        newProduct: action.payload
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        newProduct: action.payload
      };
    case ADD_GENRE:
      return {
        ...state,
        newGenre: action.payload
      };
    case CLEAR_GENRE:
      return {
        ...state,
        newProduct: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        newCategory: action.payload
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        newCategory: action.payload
      };
    case REMOVE_PRODUCT:
      return {
        ...state
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        shownProduct: action.payload
      };
    default:
      return state;
  }
}
