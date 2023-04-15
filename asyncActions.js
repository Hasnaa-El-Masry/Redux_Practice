const axios = require('axios');
const redux = require('redux');
const thunkMiddleWare = require('redux-thunk').default;
const applyMiddlerWare = redux.applyMiddleware;

const createStore = redux.createStore;

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FALIURE = 'FETCH_USERS_FALIURE';

// Action creatores:

const fetch_users_request = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetch_users_success = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetch_users_faliure = (error) => {
    return {
        type: FETCH_USERS_FALIURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case FETCH_USERS_REQUEST: 
        return {
            ...state,
            loading: true
        };

        case FETCH_USERS_SUCCESS: return {
            loading: false,
            data: action.payload,
            error: ''
        };

        case FETCH_USERS_FALIURE: return {
            data: [],
            loading: false,
            error: action.payload
        };

        default: return state;
    }
}

const fetchUsers = () => {
    
    return function (dispatch) {
        dispatch(fetch_users_request())
        
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            const users = response.data;
            dispatch(fetch_users_success(users))
        })
        .catch(error => {
            dispatch(fetch_users_faliure(error.message))
        }) 
    }

}

const store = createStore(reducer, applyMiddlerWare(thunkMiddleWare))
store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers());
