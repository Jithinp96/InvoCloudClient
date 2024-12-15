import axiosInstance from "./AxiosInstance"

export const fetchCustomersAPI = async() => {
    try {
        const response = await axiosInstance.get('/customers')
        return response
    } catch (error) {
        throw error
    }
}

export const addCustomerAPI = async(customerData) => {
    try {
        const response = await axiosInstance.post('customer/add', customerData);
        return response
    } catch (error) {
        throw error
    }
}

export const updateCustomerAPI = async() => {
    try {
        
    } catch (error) {
        
    }
}

export const customerStatusAPI = async() => {
    try {
        
    } catch (error) {
        
    }
}