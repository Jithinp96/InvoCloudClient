import axiosInstance from "./AxiosInstance"

export const fetchSalesReportAPI = async(filters) => {
    try {
        const response = await axiosInstance.get('/reports/sales', { params: filters });
        return response
    } catch (error) {
        throw error
    }
}

export const fetchItemsReportAPI = async(filters) => {
    try {
        const response = await axiosInstance.get('/reports/items', { params: filters });
        return response
    } catch (error) {
        throw error
    }
}

export const fetchCustomerLedgerAPI = async(filters) => {
    try {
        const response = await axiosInstance.get('/reports/customer-ledger', { params: filters });
        return response
    } catch (error) {
        throw error
    }
}