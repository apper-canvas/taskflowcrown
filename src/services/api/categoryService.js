import { categories } from '@/services/mockData/categories.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let categoryData = [...categories]

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categoryData]
  },

  async getById(id) {
    await delay(200)
    const category = categoryData.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    const maxId = Math.max(...categoryData.map(c => c.Id), 0)
    const newCategory = {
      Id: maxId + 1,
      ...categoryData
    }
    categoryData.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay(300)
    const index = categoryData.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    categoryData[index] = { ...categoryData[index], ...updates }
    return { ...categoryData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = categoryData.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    categoryData.splice(index, 1)
    return true
  }
}