import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select option",
  error,
  className = '',
  required = false,
  disabled = false,
  ...props 
}) => {
  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-accent-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border-2 rounded-lg appearance-none bg-white transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-accent-500 focus:ring-accent-500 focus:border-accent-500' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon name="ChevronDown" size={18} className="text-gray-400" />
        </div>
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

export default Select