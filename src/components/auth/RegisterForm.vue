<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/auth/RegisterForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <div>
      <label for="name" class="form-label">Full Name</label>
      <input 
        type="text" 
        id="name" 
        v-model="name" 
        required
        placeholder="Enter your full name"
        class="input-field"
        autocomplete="name"
      />
    </div>
    
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
        placeholder="Enter a password (min 6 characters)"
        minlength="6"
        class="input-field"
        autocomplete="new-password"
      />
    </div>
    
    <div>
      <label for="confirmPassword" class="form-label">Confirm Password</label>
      <input 
        type="password" 
        id="confirmPassword" 
        v-model="confirmPassword" 
        required
        placeholder="Confirm your password"
        class="input-field"
        autocomplete="new-password"
      />
      <div v-if="passwordError" class="mt-1 text-sm text-red-600 dark:text-red-400">
        {{ passwordError }}
      </div>
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
      :disabled="loading || !!passwordError"
    >
      <span v-if="loading" class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating Account...
      </span>
      <span v-else>Register</span>
    </button>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')

// Watch for password match
watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
  if (newConfirmPassword && newPassword !== newConfirmPassword) {
    passwordError.value = 'Passwords do not match'
  } else {
    passwordError.value = ''
  }
})

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match'
    return
  }
  
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
  } catch (err) {
    // Error is already handled in the store
    console.error('Registration error:', err)
  }
}
</script>