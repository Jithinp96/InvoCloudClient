import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Pencil, Plus } from 'lucide-react'

import { addCustomerAPI, fetchCustomersAPI, updateCustomerAPI } from '../api/CustomerAPI';

import Button from './ui/Button'
import Modal from './ui/Modal';
import InputField from './ui/InputField';
import Table from './ui/Table';
import ConfirmationBox from './ui/ConfirmationBox';
import { customerStatusAPI } from '../api/CustomerAPI';


const Customer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);

    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ 
        name: '', 
        mobile: '', 
        address: {
            houseName: '',
            place: '',
            pincode: ''
        }
    });
    const [error, setError] = ('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetchCustomersAPI();
                if (response.status === 200) {
                    setCustomers(response.data.customers);
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                toast.error('Failed to fetch customers');
            }
        };
        fetchCustomers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (['houseName', 'place', 'pincode'].includes(name)) {
            setNewCustomer(prevCustomer => ({
                ...prevCustomer,
                address: {
                    ...prevCustomer.address,
                    [name]: value
                }
            }));
        } else {
            setNewCustomer(prevCustomer => ({
                ...prevCustomer,
                [name]: value
            }));
        }
    };

    const handleEdit = (customer) => {
        setIsModalOpen(true);
        setEditMode(true);
        setCurrentCustomerId(customer._id);
        setNewCustomer({
            name: customer.name,
            mobile: customer.mobile,
            address: {
                houseName: customer.address.houseName,
                place: customer.address.place,
                pincode: customer.address.pincode
            }
        });
    };

    const handleSaveCustomer = async () => {
        if (!newCustomer.name || !newCustomer.mobile || 
            !newCustomer.address.houseName || 
            !newCustomer.address.place || 
            !newCustomer.address.pincode) {
            toast.error('Please fill all the fields!');
            return;
        }

        try {
            if (editMode) {
                const response = await updateCustomerAPI(currentCustomerId, newCustomer);
                if (response.status === 200) {
                    setCustomers(prevCustomers =>
                        prevCustomers.map(customer =>
                            customer._id === currentCustomerId 
                                ? { ...customer, ...newCustomer } 
                                : customer
                        )
                    );
                    toast.success('Customer updated successfully');
                }
            } else {
                const response = await addCustomerAPI(newCustomer);
                
                if (response.status === 201) {
                    setCustomers(prevCustomers => [...prevCustomers, response.data.newCustomer]);
                    toast.success(response.data.message);
                }
            }

            setIsModalOpen(false);
            resetFormState();
        } catch (error) {
            console.error('Error saving customer:', error);
            toast.error(editMode ? 'Failed to update customer' : 'Failed to add customer');
        }
    };

    const resetFormState = () => {
        setNewCustomer({ 
            name: '', 
            mobile: '', 
            address: {
                houseName: '',
                place: '',
                pincode: ''
            }
        });
        setEditMode(false);
        setCurrentCustomerId(null);
    };

    const handleBlockUnblock = async (customer) => {
        try {
            const response = await customerStatusAPI(customer._id);
            
            if (response.status === 200 && response.data.success) {
                setCustomers(prevItems => 
                    prevItems.map(existingCustomer => 
                        existingCustomer._id === customer._id 
                            ? { ...existingCustomer, isActive: response.data.data.isActive }
                            : existingCustomer
                    )
                );
    
                toast.success(response.data.message);
            } else {
                toast.error("Failed to update customer status. Please try again!");
            }
        } catch (error) {
            console.error('Error updating customer status:', error);
            toast.error("An error occurred while updating customer status");
        }
    };

    const columns = [
        {
            key: 'name', 
            header: 'Name',
            width: '20%',
            render: (value) => <strong>{value}</strong>
        },
        {
            key: 'mobile', 
            header: 'Mobile',
            width: '10%'
        },
        {
            key: 'address', 
            header: 'Address',
            width: '50%',
            render: (value, row) => (
                `${row.address.houseName}, ${row.address.place}, ${row.address.pincode}`
            )
        },
        {
            key: 'edit',
            header: 'Edit',
            width: '5%',
            render: (value, row) => (
                <button 
                    onClick={() => handleEdit(row)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit"
                >
                    <Pencil size={15} />
                </button>
            )
        },
        {
            key: 'status',
            header: 'Status',
            width: '8%',
            render: (value, row) => (
                <Button 
                    onClick={() => handleBlockUnblock(row)}
                    variant={row.isActive ? 'success' : 'danger'}
                    size="sm"
                    title={row.isActive ? 'Block' : 'Unblock'}
                >
                    {row.isActive ? 'Active' : 'Blocked'}
                </Button>
            )
        }
    ];

    return (
        <>
            <div className='p-5'>
                <div className='pb-5 flex justify-end'>
                    <Button
                        type='submit'
                        icon={Plus}
                        className='w-full sm:w-auto'
                        variant='success'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Customer
                    </Button>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            resetFormState();
                        }}
                        title={editMode ? 'Edit Customer Details' : 'Add New Customer'}
                        size='md'
                    >
                        <p className='text-black font-semibold py-2'>Name</p>
                        <InputField 
                            name='name'
                            value={newCustomer.name}
                            onChange={handleInputChange}
                            placeholder="Enter customer name"
                        />

                        <p className='text-black font-semibold py-2'>Mobile</p>
                        <InputField 
                            name='mobile'
                            value={newCustomer.mobile}
                            onChange={handleInputChange}
                            type='number'
                            placeholder="Enter mobile number"
                        />

                        <h3 className='text-black font-bold py-4'>address Details</h3>

                        <p className='text-black font-semibold py-2'>House Name</p>
                        <InputField 
                            name='houseName'
                            value={newCustomer.address.houseName}
                            onChange={handleInputChange}
                            placeholder="Enter house name"
                        />

                        <p className='text-black font-semibold py-2'>Place</p>
                        <InputField 
                            name='place'
                            value={newCustomer.address.place}
                            onChange={handleInputChange}
                            placeholder="Enter place"
                        />

                        <p className='text-black font-semibold py-2'>Pincode</p>
                        <InputField 
                            name='pincode'
                            value={newCustomer.address.pincode}
                            onChange={handleInputChange}
                            type='number'
                            placeholder="Enter pincode"
                        />

                        <div className="mt-4 flex justify-center space-x-2">
                            <Button 
                                variant="danger" 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetFormState();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="success"
                                onClick={handleSaveCustomer}
                            >
                                {editMode ? 'Update' : 'Confirm'}
                            </Button>
                        </div>
                    </Modal>
                </div>

                <Table 
                    data={customers} 
                    columns={columns}
                />
            </div>
        </>
    )
}

export default Customer