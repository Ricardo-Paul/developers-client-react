import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_USER } from '../types';

const initialState = {
    loading: false,
    errors: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false
            }
        case SET_ERRORS: 
            return {
                errors : action.payload,
                loading: false
            }
        default:
            return state;
    }
}