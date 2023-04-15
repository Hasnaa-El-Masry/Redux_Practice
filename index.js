const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = 'BUY_CAKE';
const buy_cake = () => {
    return { type: BUY_CAKE };
}

const BUY_ICE = 'BUY_ICE';
const buy_ice = () => {
    return { type: BUY_ICE };
}

const initialCake = {
    cakes_nums: 10,
}

const initialIce = {
    ice_nums: 20
}

const cakeReducer = (state = initialCake, action) => {

    switch (action.type) {
        case BUY_CAKE:

            return {
                ...state,
                cakes_nums: state.cakes_nums - 1
            }
        default: return state
    }

}


const iceReducer = (state = initialIce, action) => {

    switch (action.type) {
        case BUY_ICE:

            return {
                ice_nums: state.ice_nums - 1
            }
        default: return state
    }

}

const reducer = combineReducers({ ice: iceReducer, cake: cakeReducer });
const store = createStore(reducer);
console.log('state', store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())
unsubscribe();

store.dispatch(buy_cake())
