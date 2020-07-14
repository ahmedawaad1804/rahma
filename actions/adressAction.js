// action types

export const ADD_ADRESS = 'ADD_ADRESS'
export const SET_ADRESS = 'SET_ADRESS'
export const SET_ADRESS_FAILED = 'SET_ADRESS_FAILED'




/* services */
import dataService from '../services/dataService'
//action creator


export const getAdress = () => dispatch => {
    
    dataService.getAdress().then(response => {
        
        dispatch({
            type: 'SET_ADRESS',
            payload: response.data
        })

    }
    ).catch(err => {
        dispatch({
            type: 'SET_ADRESS_FAILED',
            
        })

    })




}
export const addAdress = (data) => dispatch => {
   
        dispatch({
            type: 'ADD_ADRESS',
            payload: data
        })
}
