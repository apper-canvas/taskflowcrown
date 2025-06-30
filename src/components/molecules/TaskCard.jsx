import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isPast, parseISO } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskCard = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleToggleComplete = () => {
    onToggleComplete(task.Id)
  }

  const handleEdit = () => {
    if (isEditing && editTitle.trim() !== task.title) {
      onEditTask(task.Id, { title: editTitle.trim() })
    }
    setIsEditing(!isEditing)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    }
    if (e.key === 'Escape') {
      setEditTitle(task.title)
      setIsEditing(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-accent-500'
      case 'medium': return 'border-l-warning'
      case 'low': return 'border-l-success'
      default: return 'border-l-gray-300'
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

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'Briefcase'
      case 'personal': return 'User'
      case 'shopping': return 'ShoppingCart'
      case 'health': return 'Heart'
      default: return 'Tag'
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = parseISO(dateString)
    
    if (isToday(date)) return 'Today'
    if (isPast(date)) return `Overdue (${format(date, 'MMM d')})`
    return format(date, 'MMM d')
  }

  const isDueDateOverdue = task.dueDate && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate))

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`
        bg-white rounded-xl shadow-md border-l-4 p-4 transition-all duration-200
        hover:shadow-lg group
        ${getPriorityColor(task.priority)}
        ${task.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-start space-x-3">
        <motion.div 
          className="mt-1"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            size="lg"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge
                variant={getCategoryVariant(task.category)}
                icon={getCategoryIcon(task.category)}
                size="sm"
              >
                {task.category}
              </Badge>
              
              <Badge
                variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
                size="sm"
              >
                {task.priority}
              </Badge>
            </div>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                icon="Edit2"
                onClick={handleEdit}
                className="p-2"
              />
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={() => onDeleteTask(task.Id)}
                className="p-2 text-accent-500 hover:text-accent-600 hover:bg-accent-50"
              />
            </div>
          </div>

          <div className="mb-3">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleEdit}
                className="w-full text-gray-900 font-medium bg-transparent border-b-2 border-primary-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <h3 className={`text-gray-900 font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${isDueDateOverdue ? 'text-accent-500' : ''}`}>
                  <ApperIcon name="Calendar" size={14} />
                  <span className={isDueDateOverdue ? 'font-medium' : ''}>
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" size={14} />
              <span>{format(parseISO(task.createdAt), 'MMM d')}</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {task.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-2 right-2 text-success"
          >
            <ApperIcon name="CheckCircle" size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskCard