import { tasks } from '@/services/mockData/tasks.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let taskData = [...tasks]

export const taskService = {
  async getAll() {
    await delay(300)
    return [...taskData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await delay(200)
    const task = taskData.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const maxId = Math.max(...taskData.map(t => t.Id), 0)
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: new Date().toISOString()
    }
    taskData.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const index = taskData.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    taskData[index] = { ...taskData[index], ...updates }
    return { ...taskData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = taskData.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    taskData.splice(index, 1)
    return true
  }
}