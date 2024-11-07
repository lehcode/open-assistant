<script setup lang="ts">
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

const isAuthenticated = false;
</script>

<template>
  <div
    v-if="isAuthenticated"
    class="min-h-screen bg-gray-100"
  >
    <Navbar />
    <div class="flex h-[calc(100vh-64px)]">
      <Sidebar />
      <section class="flex-1 overflow-auto p-6">
        <router-view />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
