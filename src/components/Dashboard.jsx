import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Pencil, Plus } from 'lucide-react';

import { addItemAPI, fetchItemsAPI, itemStatusAPI, updateItemAPI } from '../api/ItemAPI';
import Table from './ui/Table';
import Button from './ui/Button';
import Modal from './ui/Modal';
import InputField from './ui/InputField';
import ConfirmationBox from './ui/ConfirmationBox';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const [items, setItems] = useState([]);
    const [error, setError] = ('');
    const [newItem, setNewItem] = useState({ name: '', description: '', quantity: '', price: '' });

    useEffect(() => {
        const fetchDashboard = async() => {
            const response = await fetchItemsAPI();
            
            if(response.status === 200) {
                setItems(response.data.items)
            }
        }
        fetchDashboard()
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleEdit = (item) => {
        setIsModalOpen(true);
        setEditMode(true);
        setCurrentItemId(item._id);
        setNewItem({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
        })
    };

    const handleSaveItem = async () => {
        if (!newItem.name || !newItem.description || !newItem.quantity || !newItem.price) {
            toast.error('Please fill all the fields!');
            return;
        }
    
        try {
            if (editMode) {
                const response = await updateItemAPI(currentItemId, newItem);
                if (response.status === 200) {
                    setItems(prevItems =>
                        prevItems.map(item =>
                            item._id === currentItemId ? { ...item, ...newItem } : item
                        )
                    );
                    toast.success('Item updated successfully');
                }
            } else {
                const response = await addItemAPI(newItem);
                console.log("response.data: ", response.data);
                
                if (response.status === 201) {
                    setItems(prevItems => [...prevItems, response.data.item]);
                    toast.success('Item added successfully');
                }
            }
    
            setIsModalOpen(false);
            resetFormState();
        } catch (error) {
            console.error('Error saving item:', error);
            toast.error(editMode ? 'Failed to update item' : 'Failed to add item');
        }
    };
    
    const resetFormState = () => {
        setNewItem({ name: '', description: '', quantity: '', price: '' });
        setEditMode(false);
        setCurrentItemId(null);
    };

    const handleBlockUnblock = async (item) => {
        try {
            const response = await itemStatusAPI(item._id);
            
            if (response.status === 200 && response.data.success) {
                setItems(prevItems => 
                    prevItems.map(existingItem => 
                        existingItem._id === item._id 
                            ? { ...existingItem, isListed: response.data.data.isListed }
                            : existingItem
                    )
                );
    
                toast.success(response.data.message);
            } else {
                toast.error("Failed to update item status. Please try again!");
            }
        } catch (error) {
            console.error('Error updating item status:', error);
            toast.error("An error occurred while updating item status");
        }
    };

    const columns = [
        { 
            key: 'name', 
            header: 'Name',
            width: '20%',
            minWidth: '150px',
            render: (value) => <strong>{value}</strong>
        },
        { 
            key: 'description', 
            header: 'Description',
            width: '50%' 
        },
        { 
            key: 'quantity', 
            header: 'Quantity',
            width: '7%'
        },
        {
            key: 'price',
            header: 'Price',
            width: '10%'
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
                    variant={row.isListed ? 'success' : 'danger'}
                    size="sm"
                    title={row.isListed ? 'Block' : 'Unblock'}
                >
                    {row.isListed ? 'Active' : 'Blocked'}
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
                        Add New Item
                    </Button>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={editMode ? 'Edit Item' : 'Add New Item'}
                        size='md'
                    >
                        <p className='text-black font-semibold py-2'>Name</p>
                        <InputField 
                            name='name'
                            value={newItem.name}
                            onChange={handleInputChange}
                        />

                        <p className='text-black font-semibold py-2'>Description</p>
                        <textarea 
                            name='description'
                            value={newItem.description}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 bg-gray-200 text-gray-800 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200' 
                        />

                        <p className='text-black font-semibold py-2'>Quantity</p>
                        <InputField 
                            name='quantity'
                            value={newItem.quantity}
                            onChange={handleInputChange}
                            type='number'
                        />

                        <p className='text-black font-semibold py-2'>Price</p>
                        <InputField 
                            name='price'
                            value={newItem.price}
                            onChange={handleInputChange}
                            type='number'
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
                                onClick={handleSaveItem}
                            >
                                {editMode ? 'Update' : 'Confirm'}
                            </Button>
                        </div>
                    </Modal>
                </div>
                <Table 
                    data={items} 
                    columns={columns}
                />
            </div>

            <ConfirmationBox 
                isOpen={isConfirmationOpen}
                message='Are you sure you want to unlist this item?'
                onConfirm={''}
                onCancel={() => {
                    setIsConfirmationOpen(false)
                }}
            />
        </>
    )
}

export default Dashboard