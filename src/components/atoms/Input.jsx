import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label, 
  type = 'text', 
  placeholder,
  value,
  onChange,
  icon,
  error,
  className = '',
  required = false,
  disabled = false,
  ...props 
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-accent-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-accent-500 focus:ring-accent-500 focus:border-accent-500' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-accent-500 flex items-center">
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input