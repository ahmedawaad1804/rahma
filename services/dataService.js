import axiosInstance from './axiosInstance';

export default dataService = {
    getProducts: ( ) => {
        
        return axiosInstance
            .get('/product/getAllProduct');
    },
    getBestSeller: ( ) => {
        
        return axiosInstance
            .get('/offers/bestSeller');
    },
    getCategory: ( ) => {
        
        return axiosInstance
            .get('/offers/category');
    },
    getSubCategoryItems: ( mainCategory,category) => {
        
        return axiosInstance
            .post('/offers/categoryItems',{mainCategory,category});
    },
    search: ( text) => {
        
        return axiosInstance
            .post('/offers/handleSearch',{text});
    },
    getCategory3000: ( ) => {
        
        return axiosInstance
            .get('/category/category');
    },
    getAdress: ( ) => {
        
        return axiosInstance
            .get('/offers/adress');
    },

}
