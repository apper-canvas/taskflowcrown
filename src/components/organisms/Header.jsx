import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ onSearch, totalTasks, completedTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-500">Efficient Task Management</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Target" size={16} className="text-primary-500" />
                <span className="text-sm font-medium text-gray-600">Progress</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-success to-green-500 h-2 rounded-full"
                  />
                </div>
                <span className="text-sm font-bold text-gray-900">{completionRate}%</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <ApperIcon name="List" size={16} className="text-primary-500" />
                <span className="text-sm font-medium text-gray-600">Tasks</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {completedTasks}/{totalTasks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header