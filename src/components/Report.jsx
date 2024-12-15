import React, { useState, useEffect } from 'react'
import { 
    FileText, 
    BarChart2, 
    Users, 
    Filter, 
    Download, 
    Calendar 
} from 'lucide-react';
import { 
    fetchSalesReportAPI, 
    fetchItemsReportAPI, 
    fetchCustomerLedgerAPI 
} from '../api/ReportsAPI';
import Button from './ui/Button';
import Table from './ui/Table';
import toast from 'react-hot-toast';

const Report = () => {
    const [activeReport, setActiveReport] = useState('sales');
    const [reportData, setReportData] = useState([]);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        sortBy: 'date'
    });

    // Fetch report data based on active report type
    useEffect(() => {
        const fetchReportData = async () => {
            try {
                let response;
                switch(activeReport) {
                    case 'sales':
                        response = await fetchSalesReportAPI(filters);
                        console.log("sales response: ", response);
                        
                        break;
                    case 'items':
                        response = await fetchItemsReportAPI(filters);
                        break;
                    case 'customerLedger':
                        response = await fetchCustomerLedgerAPI(filters);
                        break;
                    default:
                        return;
                }
                setReportData(response.data);
            } catch (error) {
                toast.error('Failed to fetch report data');
                console.error(error);
            }
        };
        fetchReportData();
    }, [activeReport, filters]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Export report to CSV
    const handleExportCSV = () => {
        // Implement CSV export logic
        toast.success('CSV Export coming soon!');
    };

    // Render appropriate columns based on report type
    const getReportColumns = () => {
        switch(activeReport) {
            case 'sales':
                return [
                    { 
                        key: 'date', 
                        header: 'Date',
                        width: '20%'
                    },
                    { 
                        key: 'itemName', 
                        header: 'Item',
                        width: '25%'
                    },
                    { 
                        key: 'customerName', 
                        header: 'Customer',
                        width: '25%'
                    },
                    { 
                        key: 'quantity', 
                        header: 'Quantity',
                        width: '10%'
                    },
                    { 
                        key: 'totalAmount', 
                        header: 'Total Amount',
                        width: '20%',
                        render: (value) => `₹${value}`
                    }
                ];
            case 'items':
                return [
                    { 
                        key: 'name', 
                        header: 'Item Name',
                        width: '30%'
                    },
                    { 
                        key: 'totalSold', 
                        header: 'Total Sold',
                        width: '20%'
                    },
                    { 
                        key: 'currentStock', 
                        header: 'Current Stock',
                        width: '20%'
                    },
                    { 
                        key: 'totalRevenue', 
                        header: 'Total Revenue',
                        width: '30%',
                        render: (value) => `₹${value.toFixed(2)}`
                    }
                ];
            case 'customerLedger':
                return [
                    { 
                        key: 'date', 
                        header: 'Date',
                        width: '20%'
                    },
                    { 
                        key: 'type', 
                        header: 'Transaction Type',
                        width: '25%'
                    },
                    { 
                        key: 'itemName', 
                        header: 'Item',
                        width: '25%'
                    },
                    { 
                        key: 'amount', 
                        header: 'Amount',
                        width: '30%',
                        render: (value) => `₹${value.toFixed(2)}`
                    }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                        <FileText className="text-blue-600" size={36} />
                        Report Dashboard
                    </h1>
                </div>

                {/* Report Type Selector */}
                <div className="flex justify-center mb-6 space-x-4">
                    <Button 
                        variant={activeReport === 'sales' ? 'success' : 'outline'}
                        onClick={() => setActiveReport('sales')}
                        className="flex items-center gap-2"
                    >
                        <BarChart2 size={20} />
                        Sales Report
                    </Button>
                    <Button 
                        variant={activeReport === 'items' ? 'success' : 'outline'}
                        onClick={() => setActiveReport('items')}
                        className="flex items-center gap-2"
                    >
                        <FileText size={20} />
                        Items Report
                    </Button>
                    <Button 
                        variant={activeReport === 'customerLedger' ? 'success' : 'outline'}
                        onClick={() => setActiveReport('customerLedger')}
                        className="flex items-center gap-2"
                    >
                        <Users size={20} />
                        Customer Ledger
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                            <Calendar size={20} className="text-gray-500" />
                            <input 
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                className="border rounded px-2 py-1"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={20} className="text-gray-500" />
                            <input 
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                className="border rounded px-2 py-1"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button 
                            variant="outline"
                            onClick={handleExportCSV}
                            className="flex items-center gap-2"
                        >
                            <Download size={20} />
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Report Table */}
                <Table 
                    data={reportData}
                    columns={getReportColumns()}
                />
            </div>
        </div>
    )
}

export default Report