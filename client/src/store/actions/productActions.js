import axios from "axios";
import {
  GET_PRODUCTS_BY_SOLD,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_GENRES,
  GET_CATEGORIES,
  GET_PRODUCTS_TO_SHOP, 
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from "./types";
import { PRODUCTS_API } from "../utils/misc";

export const getProductsBySold = () => {
  const request = axios
    .get(`${PRODUCTS_API}/allproducts?sortBy=sold&order=desc&limit=3`)
    .then(res => res.data);
  return {
    type: GET_PRODUCTS_BY_SOLD,
    payload: request
  };
};

export const getProductsByArrival = () => {
  const request = axios
    .get(`${PRODUCTS_API}/allproducts?sortBy=createdAt&order=desc&limit=3`)
    .then(res => res.data);
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
};

export const getGenres = () => {
  const request = axios.get(`${PRODUCTS_API}/genres`).then(res => res.data);
  return {
    type: GET_GENRES,
    payload: request
  };
};

export const getCategories = () => {
  const request = axios.get(`${PRODUCTS_API}/categories`).then(res => res.data);
  return {
    type: GET_CATEGORIES,
    payload: request
  };
};

export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  prevState = []
) => {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios.post(`${PRODUCTS_API}/shop`, data).then(res => {
    let newState = [
      ...prevState,
      ...res.data.articles
    ]
    return {
      size: res.data.size,
      articles: newState
    };
  });
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  };
};

export const addProduct = (dataToSubmit) => {
  const request = axios.post(`${PRODUCTS_API}/new`, dataToSubmit)
    .then((response) => response.data)

    return {
      type: ADD_PRODUCT,
      payload: request
    }
}

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ''

  }
}