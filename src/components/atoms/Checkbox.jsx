import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  className = '',
  disabled = false,
  size = 'md',
  ...props 
}) => {
  const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20
  }

  return (
    <div className={`flex items-center ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        
        <label
          htmlFor={checkboxId}
          className={`
            ${sizes[size]} rounded-md border-2 cursor-pointer transition-all duration-200
            flex items-center justify-center
            ${checked 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500' 
              : 'bg-white border-gray-300 hover:border-primary-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ApperIcon 
                name="Check" 
                size={iconSizes[size]} 
                className="text-white font-bold" 
              />
            </motion.div>
          )}
        </label>
      </motion.div>
      
      {label && (
        <label 
          htmlFor={checkboxId}
          className={`ml-3 text-sm font-medium text-gray-700 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox