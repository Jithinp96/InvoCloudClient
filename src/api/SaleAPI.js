import axiosInstance from "./AxiosInstance"

export const addSaleAPI = async(saleData) => {
    try {
        const response = await axiosInstance.post('/add-sale', saleData);
        return response;
    } catch (error) {
        throw error
    }
}