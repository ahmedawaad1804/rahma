import {
    UPDATE_LANGUAGE, FREE, GET_TEST, GET_PRODUCTS, FIRST_GET_PRODUCTS, INCREASE_CART_ITEMS,SET_CART,
    GET_CART
} from '../actions/product'
const INITIAL_STATE = {
};
const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)


const cartReducer = (state = INITIAL_STATEA, action) => {
    
    if (action.type == INCREASE_CART_ITEMS && action.payload.count != 0) {

        let temp = action.payload

        if (state.find(obj => obj.item._id === action.payload.item._id) != undefined) {
            temp = {
                item:action.payload.item,
                count: action.payload.count + state.find(obj => obj.item._id === action.payload.item._id).count
            }
            state.splice(state.findIndex(obj => obj._id === action.payload._id), 1, temp);

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

export default cartReducer