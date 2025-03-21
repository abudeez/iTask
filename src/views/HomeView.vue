<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/views/HomeView.vue -->
<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Welcome back to your task dashboard
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div class="card p-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800">
        <div class="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{{ pendingCount }}</h2>
        <p class="text-indigo-700 dark:text-indigo-300 font-medium text-sm">Pending Tasks</p>
      </div>
      
      <div class="card p-6 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
        <div class="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{ completedCount }}</h2>
        <p class="text-green-700 dark:text-green-300 font-medium text-sm">Completed Tasks</p>
      </div>
      
      <div class="card p-6 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
        <div class="rounded-full bg-red-100 dark:bg-red-900/30 p-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{{ overdueCount }}</h2>
        <p class="text-red-700 dark:text-red-300 font-medium text-sm">Overdue Tasks</p>
      </div>
    </div>
    
    <div class="card p-6">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Tasks</h2>
      <TaskList 
        title=""
        :show-filters="false"
        @edit="editTask"
      />
    </div>
    
    <Transition name="fade">
      <div v-if="editingTask" class="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="closeEditForm"></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 z-10 relative
                    transform transition-all duration-300 ease-in-out scale-100">
          <button @click="closeEditForm" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 
                     focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Edit Task</h2>
          <TaskForm 
            :task="editingTask" 
            :is-editing="true"
            @submit="closeEditForm"
            @cancel="closeEditForm"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskList from '../components/tasks/TaskList.vue'
import TaskForm from '../components/tasks/TaskForm.vue'

const tasksStore = useTasksStore()
const editingTask = ref(null)

onMounted(() => {
  tasksStore.fetchTasks()
})

const pendingCount = computed(() => {
  return tasksStore.tasks.filter(task => task.status === 'pending').length
})

const completedCount = computed(() => {
  return tasksStore.tasks.filter(task => task.status === 'completed').length
})

const overdueCount = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return tasksStore.tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false
    const dueDate = new Date(task.dueDate)
    return dueDate < today
  }).length
})

const editTask = (task) => {
  editingTask.value = task
}

const closeEditForm = () => {
  editingTask.value = null
}
</script>