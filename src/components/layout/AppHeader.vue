<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/layout/AppHeader.vue -->
<template>
  <header class="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
    <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            iTask
          </h1>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <div v-if="user" class="hidden sm:flex items-center gap-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Welcome,</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ user.name }}</span>
        </div>
        
        <button 
          @click="logout" 
          class="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium 
          text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
          hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
          transition-all duration-300 active:scale-[0.98]"
        >
          <span class="mr-2">Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const logout = () => {
  authStore.logout()
}
</script>