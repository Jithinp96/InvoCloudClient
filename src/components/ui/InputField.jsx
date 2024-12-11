import React from 'react'

const InputField = ({
    name,
    type = 'text',
    id,
    placeholder,
    value,
    onChange,
    className = '',
    label,
    error,
    disabled = false,
    required = false,
    icon: Icon,
}) => {
    const baseClasses = `
        w-full 
        px-3 
        py-2 
        bg-gray-200 
        text-gray-800 
        rounded-lg 
        focus:bg-white 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-200 
        transition 
        duration-200
        ${error ? 'border-2 border-red-500' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `

    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={id} 
                    className="block text-sm font-medium pb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <input
                    name={name}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`${baseClasses} ${className} ${Icon ? 'pl-10' : ''}`}
                    // {...rest}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}

export default InputField