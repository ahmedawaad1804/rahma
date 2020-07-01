import axios from 'axios';
import configs from './config';

// Add a request interceptor 
export default axiosInstance = axios.create({
    baseURL: configs.AUTH_CONFIG.domain,
});



// axiosInstance.interceptors.request.use((request)  => {
//    return request
// }, error => {
//     console.log("yyyyyyyyyyyyyyyy");
    
//     console.log(error);
//     console.log("yyyyyyyyyyyyyyyy");
    
// });