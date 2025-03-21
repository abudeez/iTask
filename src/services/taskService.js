
// 8. Task Service
// src/services/taskService.js
import api from './api'

export default {
  getTasks() {
    return api.get('/tasks')
  },
  createTask(taskData) {
    return api.post('/tasks', taskData)
  },
  updateTask(id, taskData) {
    return api.put(`/tasks/${id}`, taskData)
  },
  deleteTask(id) {
    return api.delete(`/tasks/${id}`)
  }
}
