import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response || {};
        
        if (status === 401) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;