
// src/views/NotFoundView.vue
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <RouterLink to="/" class="home-link">Go to Dashboard</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 20px;
}

.not-found h1 {
  font-size: 80px;
  margin: 0;
  color: #4a6fa5;
}

.not-found p {
  font-size: 24px;
  margin: 10px 0 30px;
  color: #666;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4a6fa5;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #3a5985;
}
</style>