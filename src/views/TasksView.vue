<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/views/TasksView.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ getStatusTitle }}
      </h1>
      <button 
        @click="showNewTaskForm = !showNewTaskForm" 
        class="btn-primary flex items-center justify-center"
      >
        <span v-if="!showNewTaskForm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Task
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </span>
      </button>
    </div>
    
    <Transition name="slide-fade">
      <div v-if="showNewTaskForm" class="card p-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Create New Task</h2>
        <TaskForm @submit="onTaskCreated" />
      </div>
    </Transition>
    
    <TaskList :status="currentStatus" :show-filters="false" @edit="editTask" />
    
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTasksStore } from '../stores/tasks'
import TaskList from '../components/tasks/TaskList.vue'
import TaskForm from '../components/tasks/TaskForm.vue'

const tasksStore = useTasksStore()
const route = useRoute()
const showNewTaskForm = ref(false)
const editingTask = ref(null)

// Get the current status filter from the route query
const currentStatus = computed(() => route.query.status || 'all')

// Dynamic page title based on current status
const getStatusTitle = computed(() => {
  switch(currentStatus.value) {
    case 'pending': return 'Pending Tasks'
    case 'in-progress': return 'In Progress Tasks'
    case 'completed': return 'Completed Tasks'
    default: return 'All Tasks'
  }
})

onMounted(() => {
  tasksStore.fetchTasks()
})

// Watch for route changes to update the task list
watch(() => route.query.status, () => {
  // You might want to refetch tasks or apply filters here if needed
})

const onTaskCreated = () => {
  showNewTaskForm.value = false
}

const editTask = (task) => {
  editingTask.value = task
}

const closeEditForm = () => {
  editingTask.value = null
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>