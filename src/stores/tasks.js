
// 10. Tasks Store (Pinia)
// src/stores/tasks.js
import { defineStore } from 'pinia'
import taskService from '../services/taskService'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  
  getters: {
    pendingTasks: (state) => 
      state.tasks.filter(task => task.status === 'pending'),
    completedTasks: (state) => 
      state.tasks.filter(task => task.status === 'completed'),
    tasksByStatus: (state) => (status) => 
      state.tasks.filter(task => task.status === status),
  },
  
  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const response = await taskService.getTasks()
        this.tasks = response.data
      } catch (error) {
        this.error = 'Failed to fetch tasks'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    
    async createTask(taskData) {
      this.loading = true
      this.error = null
      try {
        const response = await taskService.createTask(taskData)
        this.tasks.push(response.data)
      } catch (error) {
        this.error = 'Failed to create task'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateTask(id, taskData) {
      this.loading = true
      this.error = null
      try {
        const response = await taskService.updateTask(id, taskData)
        const index = this.tasks.findIndex(task => task._id === id)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
      } catch (error) {
        this.error = 'Failed to update task'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteTask(id) {
      this.loading = true
      this.error = null
      try {
        await taskService.deleteTask(id)
        this.tasks = this.tasks.filter(task => task._id !== id)
      } catch (error) {
        this.error = 'Failed to delete task'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
