import axios from 'axios';
import { GET_PRODUCTS_BY_SOLD, GET_PRODUCTS_BY_ARRIVAL } from './types';
import { PRODUCTS_API } from '../utils/misc';

export function getProductsBySold() {
    const request = axios.get(`${PRODUCTS_API}/allproducts?sortBy=sold&order=desc&limit=4`)
        .then(res => res.data)
    return {
        type: GET_PRODUCTS_BY_SOLD,
        payload: request
    }
}

export function getProductsByArrival() {
    const request = axios.get(`${PRODUCTS_API}/allproducts?sortBy=createdAt&order=desc&limit=4`)
        .then(res => res.data);
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}
