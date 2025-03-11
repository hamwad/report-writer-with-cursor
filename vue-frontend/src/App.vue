<script setup lang="ts">
import { ref } from 'vue'
import type { UserDto } from '../../users/user.interface'
import getRequestClient from './lib/getRequestClient'

const client = getRequestClient()

const usersList = ref<UserDto[]>([])

const response = client.users.list({}).then((data) => (usersList.value = data.result as UserDto[]))
</script>

<template>
  <div>The app.vue page</div>
  <div v-for="user in usersList" :key="user.id">
    <p>{{ user.name }}</p>
  </div>
</template>

<!-- // Add vue-query // Add auto imports // Primevue/Tailwind // Font Awesome -->
