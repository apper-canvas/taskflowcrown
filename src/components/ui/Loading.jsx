import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-100"
        >
          <div className="flex items-start space-x-3">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-1" />
            
            <div className="flex-1 space-y-3">
              {/* Header with badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              
              {/* Title */}
              <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse" />
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading