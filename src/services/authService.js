
// 7. Auth Service
// src/services/authService.js
import api from './api'

export default {
  login(credentials) {
    return api.post('/auth', credentials)
  },
  register(userData) {
    return api.post('/users', userData)
  },
  getCurrentUser() {
    return api.get('/auth')
  }
}
