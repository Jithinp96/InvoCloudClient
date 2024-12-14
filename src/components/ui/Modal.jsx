import React from 'react';

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = 'md',
    className = '' 
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full h-full'
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            onClick={onClose}
        >
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div 
                className={`relative w-full ${sizeClasses[size]} mx-auto my-6`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`bg-white rounded-lg shadow-xl relative flex flex-col w-full ${className}`}>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>

                {/* Modal Body */}
                <div className="relative p-6 flex-auto">
                    {children}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Modal;