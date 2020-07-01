import axiosInstance from './axiosInstance';

export default authService = {

    login: (phoneNumber,password ) => {
        
        return axiosInstance
            .post('/auth/login/client', { phoneNumber,password });
    },
    register: async (phoneNumber, password,username,email) => {
        return axiosInstance
            .post('/auth/signUp/client', { phoneNumber, password,username,email});
    },
    sendOTP: async (phoneNumber) => {
        return axiosInstance
            .post('/auth/sendOtp', { phoneNumber});
    },
    verifyOTP: async (phoneNumber,OTP) => {
        return axiosInstance
            .post('/auth/verfiyOtp', { phoneNumber,OTP});
    },

}




