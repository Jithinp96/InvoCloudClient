import axiosInstance from "./AxiosInstance"

export const userLoginAPI = async(email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response;
    } catch (error) {
        throw error;
    }
}

export const userLogoutAPI = async() => {
    try {
        const response = await axiosInstance.post('/logout');
        return response;
    } catch (error) {
        throw error;
    }
}