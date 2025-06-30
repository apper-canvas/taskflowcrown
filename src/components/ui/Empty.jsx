import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks found", 
  message = "Get started by adding your first task or adjust your filters to see more results.",
  icon = "CheckSquare",
  action,
  actionText = "Add Task"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-12 text-center border border-gray-100"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name={icon} size={40} className="text-primary-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {message}
      </p>
      
      {action && (
        <Button 
          onClick={action}
          icon="Plus"
          variant="primary"
          size="lg"
        >
          {actionText}
        </Button>
      )}
      
      <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" size={16} className="text-primary-400" />
          <span>Quick add with Enter</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" size={16} className="text-primary-400" />
          <span>Smart filters</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Target" size={16} className="text-primary-400" />
          <span>Progress tracking</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty