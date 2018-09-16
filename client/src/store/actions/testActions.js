import axios from 'axios';
import { GET_TEST_PACK } from './types';
import {TEST_API} from '../utils/misc';

export const getSamplePack = () => {
    const request = axios.get(`${TEST_API}/stream/47c45dccd515a0f77d1a3ca738d7eecd.zip`)
     .then(res => res.data);

     return {
         type: GET_TEST_PACK,
         payload: request
     }
}