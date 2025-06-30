import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const QuickAddTask = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const categoryOptions = categories.map(cat => ({
    value: cat.name.toLowerCase(),
    label: cat.name
  }))

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask({
      title: title.trim(),
      category: category || 'personal',
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString()
    })

// Reset form
    setTitle('')
    setCategory('')
    setPriority('medium')
    setDueDate('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (title.trim()) {
        handleSubmit(e)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6"
    >
<form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              icon="Plus"
              className="mb-0"
            />
          </div>
          
          <Button
            type="submit"
            disabled={!title.trim()}
            icon="Plus"
            className="px-6"
          >
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
          />
          
          <Select
            label="Priority"
            options={priorityOptions}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </form>
    </motion.div>
  )
}

export default QuickAddTask