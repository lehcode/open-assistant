<template>
  <nav class="flex items-center justify-between px-4 py-2">
    <div className="flex items-center">
      <RouterLink to="/">
        Home
      </RouterLink>
    </div>
    <div class="flex items-center">
      <RouterLink to="/dashboard">
        Your Work
      </RouterLink>
    </div>
    <div class="flex items-center">
      <RouterLink to="/about">
        About
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
// interface INavbarProps {
//   isLoggedIn: boolean;
// }
// const props = defineProps<INavbarProps>();
</script>
