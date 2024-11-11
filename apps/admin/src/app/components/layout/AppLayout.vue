<script setup lang="ts">
import { useUserStore } from "../../stores/user.store";
import Sidebar from "./Sidebar.vue";

const userStore = useUserStore();
</script>

<template>
  <div
    v-if="userStore.authenticated"
    class="min-h-screen bg-gray-100"
  >
    <Navbar />
    <div class="flex h-[calc(100vh-64px)]">
      <Sidebar />
      <section class="flex-1 overflow-auto p-6">
        <RouterView />
      </section>
    </div>
  </div>
</template>

<style scoped>
.flex {
  height: calc(100vh - 64px);
}
</style>
