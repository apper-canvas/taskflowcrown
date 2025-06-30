import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete, 
  onDeleteTask, 
  onEditTask,
  onRetry 
}) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (tasks.length === 0) {
    return <Empty />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList