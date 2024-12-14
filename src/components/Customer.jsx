import React, { useState } from 'react'
import Button from './ui/Button'
import { Plus } from 'lucide-react'
import Modal from './ui/Modal';
import InputField from './ui/InputField';

const Customer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const [newCustomer, setNewCustomer] = useState({ name: '', mobile: ''});
    const [customer, setCustomer] = useState([]);

    const columns = [
        {
            key: 'name', 
            header: 'Name',
            width: '25%',
            minWidth: '150px',
            render: (value) => <strong>{value}</strong>
        },
        {
            key: 'mobile', 
            header: 'Mobile',
            width: '25%'
        },
        {
            key: 'address', 
            header: 'Address',
            width: '50%'
        },
    ]
    return (
        <>
            <div className='p-5'>
                <div className='pb-5 flex justify-end'>
                    <Button
                        type='submit'
                        icon={Plus}
                        className='w-full sm:w-auto'
                        variant='success'
                        onClick={setIsModalOpen(true)}
                    >
                        Add Customer
                    </Button>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title='Add New Customer'
                        size='md'
                    >
                        <p className='text-black font-semibold py-2'>Name</p>
                        <InputField 
                            name='name'
                            value={newCustomer.name}
                        />

                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Customer