<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";

const isAuthenticated = ref(false);
</script>

<template>
  <div
    v-if="isAuthenticated"
    class="min-h-screen bg-gray-100"
  >
    <div class="flex h-[calc(100vh-64px)]">
      <Sidebar />
      <section class="flex-1 overflow-auto p-6">
        <router-view />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
