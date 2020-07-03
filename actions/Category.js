// action types

export const GET_CATEGORY = 'GET_CATEGORY'

//action creator


export const getCategory = () => dispatch => {
    
    dataService.getCategory().then(response => {
        
        dispatch({
            type: 'GET_CATEGORY',
            payload: response.data.category
        })

    }
    ).catch(err => {
        dispatch({
            type: 'GET_CATEGORY_FAILED',
            
        })

    })




}