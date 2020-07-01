import { combineReducers } from 'redux';
import {
    UPDATE_LANGUAGE, FREE, GET_TEST, GET_PRODUCTS, FIRST_GET_PRODUCTS, INCREASE_CART_ITEMS,SET_CART,
    GET_CART
} from '../actions/product'
const INITIAL_STATE = {
};
const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)


const productsReducer = (state = INITIAL_STATEA, action) => {

    switch (action.type) {
        case GET_PRODUCTS:
            return state = action.payload
        case FIRST_GET_PRODUCTS:
            return state = action.payload
        default:
            return state
    }
}
const testReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TEST:
            return merge(state, action.payload)
        case FREE:
            return INITIAL_STATE
        default:
            return state
    }
}
const www = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            return merge(state, action.payload)
        case FREE:
            return INITIAL_STATE
        default:
            return state
    }

}

const cartReducer = (state = INITIAL_STATEA, action) => {
    
    if (action.type == INCREASE_CART_ITEMS && action.payload.count != 0) {

        let temp = action.payload

        if (state.find(obj => obj.item.id === action.payload.item.id) != undefined) {
            temp = {
                item:action.payload.item,
                count: action.payload.count + state.find(obj => obj.item.id === action.payload.item.id).count
            }
            state.splice(state.findIndex(obj => obj.id === action.payload.id), 1, temp);

        }
        else { state.push(temp) }


        return state
    }
    else if (action.type == FREE) {
        return INITIAL_STATEA
    }
    else if (action.type == GET_CART) {

        return state
    }
    else if (action.type == SET_CART) {
                state=action.payload
                console.log(state);
                
        return state
    }
    else return state
}

const reducer = combineReducers({
    // lang :langReducer,
    www,
    productsReducer,
    testReducer,
    cartReducer
})

export default reducer