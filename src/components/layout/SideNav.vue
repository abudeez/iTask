<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/layout/SideNav.vue -->
<template>
  <aside class="w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out
         bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:static fixed top-16 bottom-0 left-0 z-20">
    <nav class="p-4">
      <div class="space-y-1">
        <RouterLink to="/" 
          class="group flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
          :class="[route.name === 'home' ? 
            'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </RouterLink>
        
        <!-- Task Navigation Section with Header -->
        <div class="pt-5 pb-2">
          <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Tasks
          </h3>
        </div>
        
        <!-- All Tasks -->
        <RouterLink to="/tasks" exact
          class="group flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
          :class="[isActive('/tasks', '') ? 
            'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          All Tasks
        </RouterLink>
        
        <!-- Pending Tasks -->
        <RouterLink :to="{ name: 'tasks', query: { status: 'pending' } }"
          class="group flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
          :class="[isActive('/tasks', 'pending') ? 
            'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pending
        </RouterLink>
        
        <!-- In Progress Tasks -->
        <RouterLink :to="{ name: 'tasks', query: { status: 'in-progress' } }"
          class="group flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
          :class="[isActive('/tasks', 'in-progress') ? 
            'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          In Progress
        </RouterLink>
        
        <!-- Completed Tasks -->
        <RouterLink :to="{ name: 'tasks', query: { status: 'completed' } }"
          class="group flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
          :class="[isActive('/tasks', 'completed') ? 
            'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Completed
        </RouterLink>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// Helper function to determine if a link is active based on path and query
const isActive = (path, status) => {
  if (route.path !== path) return false
  
  // For the main tasks route without status filter
  if (status === '' && !route.query.status) return true
  
  // For status-specific routes
  return route.query.status === status
}
</script>