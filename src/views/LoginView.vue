<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/views/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
          Welcome to iTask
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Log in to manage your tasks efficiently
        </p>
      </div>
      
      <LoginForm />
      
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? 
          <RouterLink to="/register" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300">
            Register
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue'
</script>