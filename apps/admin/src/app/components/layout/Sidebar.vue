<script setup lang="ts">
import { LayoutGrid, Settings } from 'lucide-vue-next';
</script>

<template>
  <div class="flex min-h-[calc(100vh-64px)]">
    <aside class="w-64 bg-white shadow-sm">
      <nav class="p-4">
        <ul class="space-y-2">
          <li class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <LayoutGrid class="h-5 w-5 text-gray-500" />
            <span>Dashboard</span>
          </li>
          <li class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Settings class="h-5 w-5 text-gray-500" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
