<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/tasks/TaskItem.vue -->
<template>
  <div 
    class="card overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 transition duration-300 flex flex-col"
    :class="{ 'opacity-75 hover:opacity-100': task.status === 'completed' }"
  >
    <!-- Content Section - Will expand to fill available space -->
    <div class="p-5 flex-grow">
      <div class="flex justify-between items-start">
        <h3 
          class="text-lg font-semibold leading-tight mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition duration-300"
          :class="{ 'line-through text-gray-500 dark:text-gray-500': task.status === 'completed' }"
        >
          {{ task.title }}
        </h3>
        <span 
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="statusClasses"
        >
          {{ task.status }}
        </span>
      </div>
      
      <p 
        v-if="task.description" 
        class="text-gray-600 dark:text-gray-400 text-sm mb-3"
        :class="{ 'text-gray-400 dark:text-gray-600': task.status === 'completed' }"
      >
        {{ task.description }}
      </p>
      
      <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <span v-if="task.dueDate" class="flex items-center" :class="{ 'text-red-600 dark:text-red-400 font-medium': isOverdue }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due: {{ formatDate(task.dueDate) }}
        </span>
      </div>
    </div>
    
    <!-- Action Buttons - Always at bottom -->
    <div class="mt-auto flex border-t border-gray-100 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700">
      <button 
        v-if="task.status !== 'completed'" 
        @click="markCompleted" 
        class="flex-1 px-4 py-2 text-xs font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 
               transition-colors duration-300 focus:outline-none focus:bg-green-50 dark:focus:bg-green-900/20"
        :disabled="loading"
      >
        <span class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Complete
        </span>
      </button>
      
      <button 
        @click="$emit('edit', task)" 
        class="flex-1 px-4 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 
               transition-colors duration-300 focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20"
      >
        <span class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </span>
      </button>
      
      <button 
        @click="deleteTask" 
        class="flex-1 px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
               transition-colors duration-300 focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/20"
        :disabled="loading"
      >
        <span class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from '../../stores/tasks'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit'])

const tasksStore = useTasksStore()
const loading = computed(() => tasksStore.loading)

const statusClasses = computed(() => {
  if (props.task.status === 'completed') {
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  }
  if (props.task.status === 'in-progress') {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
  }
  return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
})

const isOverdue = computed(() => {
  if (!props.task.dueDate) return false
  const dueDate = new Date(props.task.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dueDate < today && props.task.status !== 'completed'
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const markCompleted = async () => {
  try {
    await tasksStore.updateTask(props.task._id, {
      ...props.task,
      status: 'completed'
    })
  } catch (err) {
    console.error('Error completing task:', err)
  }
}

const deleteTask = async () => {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await tasksStore.deleteTask(props.task._id)
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }
}
</script>
