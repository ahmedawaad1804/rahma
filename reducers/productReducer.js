import { combineReducers } from 'redux';


import productsReducer from "./product"
import cartReducer from "./cart"
import bestsellerReducer from "./bestSeller"
import categoryReducer from "./Category"



const reducer = combineReducers({
    // lang :langReducer,
    productsReducer,
    cartReducer,
    bestsellerReducer,
    categoryReducer
})

export default reducer