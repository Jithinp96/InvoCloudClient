import React, { useState, useEffect } from 'react';
import { FileText, BarChart2, Users, Download, Printer, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

import { fetchSalesReportAPI, fetchItemsReportAPI, fetchCustomerLedgerAPI, sendReportEmail } from '../api/ReportsAPI';
import { fetchCustomersAPI } from '../api/CustomerAPI';

import Button from './ui/Button';
import Table from './ui/Table';

const Report = () => {
    const [activeReport, setActiveReport] = useState('sales');
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (activeReport === 'customerLedger') {
            const fetchCustomers = async () => {
                try {
                    const response = await fetchCustomersAPI();
                    setCustomers(response.data.customers || []);
                } catch (error) {
                    toast.error('Failed to fetch customer data');
                    console.error(error);
                }
            };
            fetchCustomers();
        }
    }, [activeReport]);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            try {
                let response;
                if (activeReport === 'sales') {
                    response = await fetchSalesReportAPI();
                } else if (activeReport === 'items') {
                    response = await fetchItemsReportAPI();
                } else if (activeReport === 'customerLedger' && customerId) {
                    response = await fetchCustomerLedgerAPI(customerId);
                } else {
                    return;
                }
                setReportData(response.data.report || response.data.ledger || []);
            } catch (error) {
                toast.error('Failed to fetch report data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchReportData();
    }, [activeReport, customerId]);

    const handleExportOption = (option) => {
        switch (option) {
            case 'print':
                handlePrint();
                break;
            case 'excel':
                handleExportExcel();
                break;
            case 'pdf':
                handleDownloadPDF();
                break;
            case 'email':
                handleEmailReport();
                break;
            default:
                toast.error('Invalid export option');
        }
    };

    // 1. Print Report
    const handlePrint = () => {
        const tableContent = document.getElementById('reportTable').outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Print Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        table, th, td { border: 1px solid black; }
                        th, td { padding: 8px; text-align: left; }
                    </style>
                </head>
                <body>
                    ${tableContent}
                </body>
            </html>
        `);
        newWindow.document.close();
        newWindow.print();
    };    

    // 2. Export to Excel
    const handleExportExcel = () => {
        if (!reportData.length) {
            toast.error('No data to export');
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(reportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        XLSX.writeFile(workbook, `${activeReport}-report.xlsx`);
        toast.success('Excel file exported!');
    };

    // 3. Export to PDF
    const handleDownloadPDF = () => {
        const tableContent = document.getElementById('reportTable').outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Download PDF</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        table, th, td { border: 1px solid black; }
                        th, td { padding: 8px; text-align: left; }
                    </style>
                </head>
                <body>
                    ${tableContent}
                </body>
            </html>
        `);
        newWindow.document.close();
        newWindow.print();
    };

    const handleEmailReport = async () => {
        if (!reportData.length) {
            toast.error('No data to email');
            return;
        }
        try {
            await sendReportEmail(activeReport, reportData)
            toast.success('Report sent via email!');
        } catch (error) {
            toast.error('Failed to send email');
            console.error(error);
        }
    };

    const getReportColumns = () => {
        switch (activeReport) {
            case 'sales':
                return [
                    { key: 'date', header: 'Date', render: (value) => new Date(value).toLocaleDateString() },
                    { key: 'item', header: 'Item', render: (value) => value },
                    { key: 'customer', header: 'Customer', render: (value) => value },
                    { key: 'quantity', header: 'Quantity' },
                    { key: 'total', header: 'Total Amount', render: (value) => `₹${value}` },
                    { key: 'paymentMode', header: 'Payment Mode' },
                ];
            case 'items':
                return [
                    { key: 'name', header: 'Item Name' },
                    { key: 'description', header: 'Description' },
                    { key: 'totalSold', header: 'Total Sold' },
                    { key: 'remainingStock', header: 'Remaining Stock' },
                ];
            case 'customerLedger':
                return [
                    { key: 'date', header: 'Date', render: (value) => new Date(value).toLocaleDateString() },
                    { key: 'item', header: 'Item', render: (value) => value },
                    { key: 'quantity', header: 'Quantity' },
                    { key: 'total', header: 'Total Amount', render: (value) => `₹${value}` },
                    { key: 'paymentMode', header: 'Payment Mode' },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 flex items-center gap-3 justify-center">
                    <FileText className="text-blue-600" size={36} /> Report Dashboard
                </h1>
                <div className="flex justify-center mb-6 space-x-4">
                    {['sales', 'items', 'customerLedger'].map((type) => (
                        <Button
                            key={type}
                            variant={activeReport === type ? 'success' : 'outline'}
                            onClick={() => {
                                setActiveReport(type);
                                if (type !== 'customerLedger') setCustomerId('');
                            }}
                        >
                            {type === 'sales' && <BarChart2 size={20} />}
                            {type === 'items' && <FileText size={20} />}
                            {type === 'customerLedger' && <Users size={20} />}
                            {type.charAt(0).toUpperCase() + type.slice(1)} Report
                        </Button>
                    ))}
                </div>
                {activeReport === 'customerLedger' && (
                    <div className="mb-6 text-black">
                        <label htmlFor="customerSelect" className="block font-medium mb-2">
                            Select Customer:
                        </label>
                        <select
                            id="customerSelect"
                            className="w-full p-2 border rounded-lg"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                        >
                            <option value="">-- Select a Customer --</option>
                            {customers.map((customer) => (
                                <option key={customer._id} value={customer._id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="flex justify-end items-center mb-6 space-x-4">
                    {['print', 'excel', 'pdf', 'email'].map((option) => (
                        <Button
                            key={option}
                            variant="outline"
                            onClick={() => handleExportOption(option)}
                        >
                            {option === 'print' && <Printer />}
                            {option === 'excel' && <Download />}
                            {option === 'pdf' && <FileText />}
                            {option === 'email' && <Mail />}
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Button>
                    ))}
                </div>
                <Table 
                    id="reportTable" 
                    loading={loading} 
                    data={reportData} 
                    columns={getReportColumns()} 
                />
            </div>
        </div>
    );
};

export default Report;