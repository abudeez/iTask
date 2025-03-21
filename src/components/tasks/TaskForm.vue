<!-- filepath: /c:/Users/Abdullah/Desktop/Makers Task/iTask/src/components/tasks/TaskForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="form-label">Task Title</label>
      <input 
        type="text" 
        id="title" 
        v-model="title" 
        required
        placeholder="Enter task title"
        class="input-field"
      />
    </div>
    
    <div>
      <label for="description" class="form-label">Description</label>
      <textarea 
        id="description" 
        v-model="description" 
        rows="3"
        placeholder="Enter task description (optional)"
        class="input-field"
      ></textarea>
    </div>
    
    <div>
      <label for="dueDate" class="form-label">Due Date</label>
      <input 
        type="date" 
        id="dueDate" 
        v-model="dueDate"
        class="input-field"
      />
    </div>
    
    <div v-if="isEditing">
      <label for="status" class="form-label">Status</label>
      <select id="status" v-model="status" class="input-field">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    
    <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
      {{ error }}
    </div>
    
    <div class="flex gap-3 pt-2">
      <button 
        type="submit" 
        class="btn-primary flex items-center justify-center"
        :class="{'opacity-70 cursor-not-allowed': loading}"
        :disabled="loading"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ submitButtonText }}
      </button>
      
      <button 
        type="button" 
        v-if="isEditing" 
        @click="$emit('cancel')" 
        class="btn-secondary"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '../../stores/tasks'

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const tasksStore = useTasksStore()
const loading = computed(() => tasksStore.loading)
const error = computed(() => tasksStore.error)

const title = ref('')
const description = ref('')
const dueDate = ref('')
const status = ref('pending')

// Set form values when editing an existing task
onMounted(() => {
  if (props.task) {
    title.value = props.task.title
    description.value = props.task.description || ''
    status.value = props.task.status
    if (props.task.dueDate) {
      // Format date for input date field (YYYY-MM-DD)
      const date = new Date(props.task.dueDate)
      dueDate.value = date.toISOString().split('T')[0]
    }
  }
})

const submitButtonText = computed(() => {
  if (loading.value) {
    return props.isEditing ? 'Updating...' : 'Creating...'
  }
  return props.isEditing ? 'Update Task' : 'Create Task'
})

const handleSubmit = async () => {
  const taskData = {
    title: title.value,
    description: description.value,
    status: status.value,
  }
  
  if (dueDate.value) {
    taskData.dueDate = new Date(dueDate.value)
  }
  
  try {
    if (props.isEditing && props.task) {
      await tasksStore.updateTask(props.task._id, taskData)
      emit('submit')
    } else {
      await tasksStore.createTask(taskData)
      // Reset form
      title.value = ''
      description.value = ''
      dueDate.value = ''
      status.value = 'pending'
      emit('submit')
    }
  } catch (err) {
    console.error('Task submission error:', err)
  }
}
</script>