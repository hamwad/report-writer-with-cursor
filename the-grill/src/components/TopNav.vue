<script setup lang="ts">
import Logo from '@/assets/logo.svg'
import type { MenuItem } from 'primevue/menuitem'

const items = ref<MenuItem[]>([
  { label: 'Home', key: '/' },
  { label: 'About', key: '/about' },
  { label: 'Users', key: '/users' },
])
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <img height="40" width="40" :src="Logo" alt="Logo" @click="$router.push('/')" />
    </template>
    <template #item="{ item }">
      <RouterLink :to="item.key ?? '/'">{{ item.label }}</RouterLink>
    </template>
  </Menubar>
</template>
