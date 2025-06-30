import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    work: "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
    personal: "bg-gradient-to-r from-accent-500 to-pink-500 text-white",
    shopping: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    health: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    warning: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
    error: "bg-gradient-to-r from-red-500 to-pink-500 text-white"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="mr-1" 
        />
      )}
      {children}
    </span>
  )
}

export default Badge