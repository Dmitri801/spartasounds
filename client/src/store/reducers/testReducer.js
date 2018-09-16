import { GET_TEST_PACK } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case GET_TEST_PACK: 
         return {
             ...state,
        
         }
        default: 
        return state;
    }
}