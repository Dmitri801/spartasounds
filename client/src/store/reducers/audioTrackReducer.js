import { GET_ALL_AUDIO_TRACKS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_AUDIO_TRACKS:
         return {
             ...state,
             fileData: action.payload
         }
        default:
        return state
    } 
}