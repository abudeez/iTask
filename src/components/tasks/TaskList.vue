<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/tasks/TaskList.vue -->
<template>
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ title }}</h2>
      <div v-if="showFilters" class="flex items-center">
        <select 
          v-model="selectedStatus" 
          class="input-field py-1 px-3 text-sm rounded-lg"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center p-8">
      <div class="loader">
        <div class="loading-indicator">
          <div class="spinner"></div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 mt-3">Loading tasks...</p>
      </div>
    </div>
    
    <div v-else-if="error" class="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
      <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </div>
    </div>
    
    <div v-else-if="filteredTasks.length === 0" class="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
      <p class="text-gray-600 dark:text-gray-400">No tasks found</p>
    </div>
    
    <div v-else class="space-y-4">
      <TransitionGroup 
        name="task-list" 
        tag="div" 
        class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      >
        <TaskItem 
          v-for="task in filteredTasks" 
          :key="task._id" 
          :task="task"
          @edit="task => $emit('edit', task)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useTasksStore } from '../../stores/tasks'
import TaskItem from './TaskItem.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Tasks'
  },
  showFilters: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['edit'])

const tasksStore = useTasksStore()
const tasks = computed(() => tasksStore.tasks)
const loading = computed(() => tasksStore.loading)
const error = computed(() => tasksStore.error)

// Use the status from props instead of local state
const selectedStatus = ref(props.status)

// Update selectedStatus when props.status changes
watch(() => props.status, (newStatus) => {
  selectedStatus.value = newStatus
})

const filteredTasks = computed(() => {
  if (selectedStatus.value === 'all') {
    return tasks.value
  }
  return tasks.value.filter(task => task.status === selectedStatus.value)
})
</script>

<style scoped>
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(79, 70, 229, 0.1);
  border-top-color: rgba(79, 70, 229, 1);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* List transitions */
.task-list-move, 
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.task-list-leave-active {
  position: absolute;
}
</style>