import axiosInstance from "./AxiosInstance"

export const fetchCustomersAPI = async() => {
    try {
        const response = await axiosInstance.get('/customers');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addCustomerAPI = async(customerData) => {
    try {
        const response = await axiosInstance.post('customer/add', customerData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateCustomerAPI = async(currentCustomerId, newCustomer) => {
    try {
        const response = await axiosInstance.put('/customer/update', newCustomer, {params: {currentCustomerId}});
        return response;
    } catch (error) {
        throw error;
    }
}

export const customerStatusAPI = async(customerId) => {
    try {
        const response = await axiosInstance.patch('/customer/change-status', {customerId});
        return response;
    } catch (error) {
        throw error;
    }
}