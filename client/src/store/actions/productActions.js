import axios from 'axios';
import { GET_PRODUCTS_BY_SOLD, GET_PRODUCTS_BY_ARRIVAL, GET_GENRES, GET_CATEGORIES } from './types';
import { PRODUCTS_API } from '../utils/misc';

export const getProductsBySold = () => {
    const request = axios.get(`${PRODUCTS_API}/allproducts?sortBy=sold&order=desc&limit=3`)
        .then(res => res.data)
    return {
        type: GET_PRODUCTS_BY_SOLD,
        payload: request
    }
}

export const getProductsByArrival = () => {
    const request = axios.get(`${PRODUCTS_API}/allproducts?sortBy=createdAt&order=desc&limit=3`)
        .then(res => res.data);
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export const getGenres = () => {
    const request = axios.get(`${PRODUCTS_API}/genres`)
        .then(res => res.data)
    return {
        type: GET_GENRES,
        payload: request
    }
}

export const getCategories = () => {
    const request = axios.get(`${PRODUCTS_API}/categories`)
        .then(res => res.data)
    return {
        type: GET_CATEGORIES,
        payload: request
    }
}

