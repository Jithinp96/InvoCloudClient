import axiosInstance from "./AxiosInstance"

export const addItemAPI = async(itemData) => {
    try {
        const response = await axiosInstance.post('/addItem', itemData)
        return response
    } catch (error) {
        throw error
    }
}

export const fetchItemsAPI = async (name = '') => {
    try {
        const response = await axiosInstance.get(`/items`, {
            params: { name }, // Send the query as a parameter
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const itemStatusAPI = async(itemId) => {
    try {
        const response = axiosInstance.patch('/item/change-status', {itemId});
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateItemAPI = async(currentItemId, newItem) => {
    try {
        const response = axiosInstance.put('/item/update', newItem, {params: {currentItemId}})
        return response;
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