import axiosInstance from './axiosInstance';

export default dataService = {
    getProducts: ( ) => {
        
        return axiosInstance
            .get('/auth/products');
    },
}