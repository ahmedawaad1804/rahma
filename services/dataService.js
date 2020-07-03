import axiosInstance from './axiosInstance';

export default dataService = {
    getProducts: ( ) => {
        
        return axiosInstance
            .get('/auth/products');
    },
    getBestSeller: ( ) => {
        
        return axiosInstance
            .get('/auth/bestSeller');
    },
    getCategory: ( ) => {
        
        return axiosInstance
            .get('/auth/category');
    },
    getSubCategoryItems: ( mainCategory,category) => {
        
        return axiosInstance
            .post('/auth/categoryItems',{mainCategory,category});
    },
    search: ( text) => {
        
        return axiosInstance
            .post('/auth/handleSearch',{text});
    },
}
