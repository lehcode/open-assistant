<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import AppLayout from './components/layout/AppLayout.vue';
import { ref, watch } from 'vue';
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.store";

const userStore = useUserStore();

let isAuthenticated = ref(false);

watch(() => userStore.authorized, (value: boolean) => {
  debugger;
  isAuthenticated.value = value;

  if (isAuthenticated.value) {
    const router = useRouter();
    isAuthenticated.value = true;

    if (process.env.NODE_ENV !== "production") console.log("Authenticated");

    // redirect to dashboard
    router.push("/dashboard");
  } else {
    // TODO: Add alert with error
    console.log("User not authorized");
  }
});
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/dashboard">
        Your Work
      </RouterLink>
      <RouterLink to="/about">
        About
      </RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped lang="scss">
.min-h-screen {
  min-height: 100vh;
}

main {
  padding-top: 5rem;
}

header {
  line-height: 1.5;
  max-width: 100vw;
}

nav > a {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    margin-left: auto;
    margin-right: auto;
    max-width: 768px;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
