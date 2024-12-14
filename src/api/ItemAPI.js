import axiosInstance from "./AxiosInstance"

export const addItemAPI = async(itemData) => {
    try {
        const response = await axiosInstance.post('/addItem', itemData)
        return response
    } catch (error) {
        throw error
    }
}

export const fetchItemsAPI = async() => {
    try {
        const response = await axiosInstance.get('/items');
        return response;
    } catch (error) {
        throw error;
    }
}

export const itemStatusAPI = async(itemId) => {
    try {
        const response = axiosInstance.patch('/item/change-status', {itemId});
        return response
    } catch (error) {
        throw error;
    }
}

export const deleteItemAPI = async(itemId) => {
    try {
        const response = await axiosInstance.delete('/item/delete', { params: { itemId }});
        return response
    } catch (error) {
        throw error
    }
}