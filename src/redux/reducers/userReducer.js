import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from '../types';

const initialState = {
    authenticated: false,
    devCredentials: {},
    contributors: [],
    notifications: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED: 
        return {
            ...state,
            authenticated: true
        };
        case SET_UNAUTHENTICATED: 
        return initialState;

        case SET_USER:
            return {
                ...action.payload,
                authenticated: true,
                loading: false
            };

        case LOADING_USER:
            return {
                ...state,
                laoding: true
            }

        default: 
         return state;
}
}