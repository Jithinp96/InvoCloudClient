import axiosInstance from "./AxiosInstance"

export const fetchSalesReportAPI = async() => {
    try {
        const response = await axiosInstance.get('/reports/sales');
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchItemsReportAPI = async() => {
    try {
        const response = await axiosInstance.get('/reports/items');
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchCustomerLedgerAPI = async(customerId) => {
    try {
        console.log("Heree: ", customerId);
        const response = await axiosInstance.get(`/reports/customer-ledger/${customerId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const sendReportEmail = async(reportData) => {
    try {
        const response = await axiosInstance.post('/reports/email', {activeReport, reportData});
        return response;
    } catch (error) {
        throw error;
    }
}