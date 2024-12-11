import React from 'react'

// Define button variants
const VARIANTS = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-blue-500 hover:bg-blue-50'
}

const Button = ({
    children,
    variant = 'primary', // Default variant
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
    size = 'md', // Additional size prop
    icon: Icon, // Optional icon
    iconPosition = 'left', // Icon position
    ...rest
}) => {
    // Size variations
    const sizeClasses = {
        sm: 'py-1 px-2 text-sm',
        md: 'py-2 px-4',
        lg: 'py-3 px-6 text-lg'
    }

    // Combine classes
    const buttonClasses = `
        ${VARIANTS[variant] || VARIANTS.primary}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-semibold 
        rounded-md 
        transition 
        duration-300 
        ease-in-out
        flex 
        items-center 
        justify-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
    `

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {Icon && iconPosition === 'left' && (
                <Icon className="mr-2 h-5 w-5" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
                <Icon className="ml-2 h-5 w-5" />
            )}
        </button>
    )
}

export default Button