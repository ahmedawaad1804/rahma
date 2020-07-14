import {
    ADD_ADRESS,
    SET_ADRESS,
    SET_ADRESS_FAILED
} from '../actions/adressAction'

const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)


const adressReducer = (state = INITIAL_STATEA, action) => {

    switch (action.type) {
        case SET_ADRESS:
            state = action.payload
            return state
        case ADD_ADRESS:
            state = [...state, action.payload]
            return state
        default:
            return state
    }
}

export default adressReducer