import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  selectedPriority, 
  selectedStatus,
  onCategoryChange,
  onPriorityChange,
  onStatusChange,
  taskCounts
}) => {
  const priorityOptions = [
    { value: 'all', label: 'All Priorities', icon: 'List' },
    { value: 'high', label: 'High Priority', icon: 'AlertTriangle', color: 'error' },
    { value: 'medium', label: 'Medium Priority', icon: 'Clock', color: 'warning' },
    { value: 'low', label: 'Low Priority', icon: 'CheckCircle', color: 'success' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: 'List' },
    { value: 'pending', label: 'Pending', icon: 'Circle' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle2' }
  ]

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'Briefcase'
      case 'personal': return 'User'
      case 'shopping': return 'ShoppingCart'
      case 'health': return 'Heart'
      default: return 'Tag'
    }
  }

  const getCategoryVariant = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'work'
      case 'personal': return 'personal'
      case 'shopping': return 'shopping'
      case 'health': return 'health'
      default: return 'default'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-fit sticky top-6"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" size={20} className="text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
              size="sm"
              icon="List"
              onClick={() => onCategoryChange('all')}
              className="w-full justify-start"
            >
              All Categories
              <Badge variant="default" size="sm" className="ml-auto">
                {taskCounts.total}
              </Badge>
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.Id}
                variant={selectedCategory === category.name.toLowerCase() ? 'primary' : 'ghost'}
                size="sm"
                icon={getCategoryIcon(category.name)}
                onClick={() => onCategoryChange(category.name.toLowerCase())}
                className="w-full justify-start"
              >
                {category.name}
                <Badge 
                  variant={getCategoryVariant(category.name)} 
                  size="sm" 
                  className="ml-auto"
                >
                  {taskCounts.categories[category.name.toLowerCase()] || 0}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Priority</h3>
          <div className="space-y-2">
            {priorityOptions.map((priority) => (
              <Button
                key={priority.value}
                variant={selectedPriority === priority.value ? 'primary' : 'ghost'}
                size="sm"
                icon={priority.icon}
                onClick={() => onPriorityChange(priority.value)}
                className="w-full justify-start"
              >
                {priority.label}
                {priority.value !== 'all' && (
                  <Badge 
                    variant={priority.color || 'default'} 
                    size="sm" 
                    className="ml-auto"
                  >
                    {taskCounts.priorities[priority.value] || 0}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? 'primary' : 'ghost'}
                size="sm"
                icon={status.icon}
                onClick={() => onStatusChange(status.value)}
                className="w-full justify-start"
              >
                {status.label}
                {status.value === 'pending' && (
                  <Badge variant="warning" size="sm" className="ml-auto">
                    {taskCounts.pending}
                  </Badge>
                )}
                {status.value === 'completed' && (
                  <Badge variant="success" size="sm" className="ml-auto">
                    {taskCounts.completed}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4 border-t border-gray-100">
          <Button
            variant="secondary"
            size="sm"
            icon="RotateCcw"
            onClick={() => {
              onCategoryChange('all')
              onPriorityChange('all')
              onStatusChange('all')
            }}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default FilterSidebar