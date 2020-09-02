import axiosInstance from './axiosInstance';

export default dataService = {
    getProducts: () => {

        return axiosInstance
            .get('/product/getAllProduct');
    },
    getBestSeller: () => {

        return axiosInstance
            .get('/product/getBestSeller');
    },
    getLatestOffers: () => {

        return axiosInstance
            .get('/offers/offers');
    },
    getCategory: () => {

        return axiosInstance
            .get('/offers/category');
    },
    // waiting
    getSubCategoryItems: (productCatId) => {

        return axiosInstance
            .post('/product/CatProduct', { productCatId });
    },
    search: (text) => {

        return axiosInstance
            .post('/offers/handleSearch', { text });
    },
    getCategory3000: () => {

        return axiosInstance
            .get('/category/category');
    },
    // waiting
    addAdress: (address) => {
        // console.log("adress sent");
        return axiosInstance
            .post('/client/addAddress', { address });
    },
    checkCartItems: (cart) => {
        return axiosInstance
            .post('/client/addAddress', { cart });
    },
    getBrief: () => {
        return axiosInstance
            .get('/general/info');
    },






}
