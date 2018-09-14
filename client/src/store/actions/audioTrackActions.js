import axios from 'axios';
import { GET_ALL_AUDIO_TRACKS } from './types';
import { AUDIO_API } from '../utils/misc';


export const getAllAudio = () => {
    const request = axios.get(`${AUDIO_API}/files`)
        .then(res => res.data)
    return {
        type: GET_ALL_AUDIO_TRACKS,
        payload: request
    }
}