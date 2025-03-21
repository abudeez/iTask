<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/auth/LoginForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="email" class="form-label">Email Address</label>
      <input 
        type="email" 
        id="email" 
        v-model="email" 
        required
        placeholder="Enter your email"
        class="input-field"
        autocomplete="email"
      />
    </div>
    
    <div>
      <label for="password" class="form-label">Password</label>
      <input 
        type="password" 
        id="password" 
        v-model="password" 
        required
        placeholder="Enter your password"
        class="input-field"
        autocomplete="current-password"
      />
    </div>
    
    <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
      {{ error }}
    </div>
    
    <button 
      type="submit" 
      class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
            text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
            disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
      :disabled="loading"
    >
      <span v-if="loading" class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Logging in...
      </span>
      <span v-else>Log in</span>
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
  } catch (err) {
    // Error is already handled in the store
    console.error('Login error:', err)
  }
}
</script>