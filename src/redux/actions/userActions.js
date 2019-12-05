import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
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

export const signupUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/signup', userData )
    .then(res => {
        console.log('token', res.data);
        const FBIdToken = `Bearer ${res.data}`
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getDeveloperData());
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

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdtoken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHENTICATED })
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

















// export const signupUser = (userData, history) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios.post('/signup', userData )
//     .then(res =>{
//         console.log(res.data);
//         const FBIdToken = `Bearer ${res.data.devToken}`
//         localStorage.setItem('FBIdToken', FBIdToken);
//         axios.defaults.headers.common['Authorization'] = FBIdToken;

//         dispatch(getDeveloperData());
//         dispatch({ type: CLEAR_ERRORS });
        
//         history.push('/')
//     })
//     .catch(err => {
//         dispatch({
//             type: SET_ERRORS,
//             payload: err.response.data
//         });
//         console.log(err.response.data)
//     })
// }