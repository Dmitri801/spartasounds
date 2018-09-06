import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
    loginModalOpen: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case OPEN_MODAL:
         return {
             ...state,
             loginModalOpen: true
         }
        case CLOSE_MODAL:
         return {
             ...state,
             loginModalOpen: false
         }
        default:
         return state;
    }
}