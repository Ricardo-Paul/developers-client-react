import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/login', userData )
    .then(res => {
        console.log(res.data)
        const FBIdToken = `Bearer ${res.data.loginToken}`
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getDeveloperData());
        // debugger;

        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: {
                errors: 'Please verify your credentials'
            }
        })
    })
}

export const getDeveloperData = () => (dispatch) => {
    axios.get('/developer')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch((err) => console.log(err));
}