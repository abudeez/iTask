<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-poppins">
    <AppHeader v-if="isAuthenticated" />
    <div class="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      <SideNav v-if="isAuthenticated" />
      <main class="flex-1 p-4 md:p-6 lg:p-8 max-w-full transition-all duration-300 ease-in-out">
        <div class="max-w-7xl mx-auto">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useAuthStore } from './stores/auth'
import AppHeader from './components/layout/AppHeader.vue'
import SideNav from './components/layout/SideNav.vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

onMounted(() => {
  if (authStore.token) {
    authStore.fetchCurrentUser()
  }
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --secondary: #0EA5E9;
  --accent: #8B5CF6;
}

body {
  @apply antialiased text-gray-800 dark:text-gray-200;
  font-family: 'Poppins', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom components */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium 
    hover:bg-indigo-700 transition-all duration-300 focus:outline-none 
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 
    disabled:cursor-not-allowed active:scale-[0.98];
  }
  
  .btn-secondary {
    @apply px-4 py-2 bg-white border border-gray-300 text-gray-700 dark:bg-gray-800 
    dark:border-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 
    dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none 
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 
    disabled:cursor-not-allowed active:scale-[0.98];
  }

  .input-field {
    @apply w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none 
    focus:ring-2 focus:ring-indigo-500 transition-all duration-300;
  }

  .form-label {
    @apply block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300;
  }

  .card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg 
    transition-all duration-300 border border-gray-100 dark:border-gray-700;
  }
}
</style>