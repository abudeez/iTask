
// 9. Auth Store (Pinia)
// src/stores/auth.js
import { defineStore } from 'pinia'
import authService from '../services/authService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    userFullName: (state) => state.user ? state.user.name : ''
  },
  
  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await authService.login(credentials)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.fetchCurrentUser()
        router.push('/')
      } catch (error) {
        this.error = error.response?.data?.msg || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await authService.register(userData)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.fetchCurrentUser()
        router.push('/')
      } catch (error) {
        this.error = error.response?.data?.msg || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async fetchCurrentUser() {
      if (!this.token) return
      
      this.loading = true
      try {
        const response = await authService.getCurrentUser()
        this.user = response.data
      } catch (error) {
        this.logout()
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})
