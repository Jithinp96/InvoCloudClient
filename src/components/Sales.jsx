import React, { useState, useEffect } from 'react'
import { ShoppingCart, CreditCard, User } from 'lucide-react';
import { fetchCustomersAPI } from '../api/CustomerAPI';
import { fetchItemsAPI } from '../api/ItemAPI';
import { addSaleAPI } from '../api/SaleAPI';
import Button from './ui/Button';
import InputField from './ui/InputField';
import toast from 'react-hot-toast';

const Sales = () => {
    const [items, setItems] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        item: '',
        customer: '',
        quantity: 1,
        paymentMode: 'Cash',
    });
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsRes, customersRes] = await Promise.all([
                    fetchItemsAPI(),
                    fetchCustomersAPI()
                ]);
                setItems(itemsRes.data.items);
                setCustomers(customersRes.data.customers);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load data');
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }));

        if (name === 'item') {
            const item = items.find(i => i._id === value);
            setSelectedItem(item);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedItem && formData.quantity > selectedItem.quantity) {
            toast.error(`Only ${selectedItem.quantity} items available in stock`);
            return;
        }

        try {
            const response = await addSaleAPI(formData);
            toast.success(response.data.message);
            setFormData({
                item: '',
                customer: '',
                quantity: '',
                paymentMode: 'Cash',
            });
            setSelectedItem(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                        <ShoppingCart className="text-blue-600" size={36} />
                        Record a Sale
                    </h1>
                    <p className="text-gray-500 mt-2">Complete the sale by selecting an item and customer</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <ShoppingCart size={20} className="text-blue-600" />
                            Item
                        </label>
                        <select 
                            name="item" 
                            value={formData.item} 
                            onChange={handleChange} 
                            required
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an item</option>
                            {items.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name} - (Stock: {item.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedItem && (
                        <div className="bg-blue-50  text-black p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-blue-800">Item Details</p>
                                <p>Price: ₹{selectedItem.price}</p>
                                <p>Available Stock: {selectedItem.quantity}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <User size={20} className="text-green-600" />
                            Customer
                        </label>
                        <select 
                            name="customer" 
                            value={formData.customer} 
                            onChange={handleChange} 
                            required
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select a customer</option>
                            {customers.map((customer) => (
                                <option key={customer._id} value={customer._id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Quantity
                        </label>
                        <InputField
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            type="number"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <CreditCard size={20} className="text-purple-600" />
                            Payment Mode
                        </label>
                        <select 
                            name="paymentMode" 
                            value={formData.paymentMode} 
                            onChange={handleChange} 
                            required
                            className="w-full  text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <Button 
                            type="submit"
                            variant='success'
                            className="w-full"
                        >
                            Record Sale
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sales