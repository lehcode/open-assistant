<script setup lang="ts">
import { reactive } from "vue";
import LoginForm from "../components/forms/LoginForm.vue";
import { useAuth } from "../composables/auth";

const loginRequest = reactive({
  username: "",
  password: "",
  rememberMe: false
})

const handleLogin = async () => {
  try {
    const result = await useAuth().provideLogin(loginRequest);
    if (result.success) {
      // redirect to dashboard
      // this.$router.push('/dashboard');
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <LoginForm
      v-model="loginRequest"
      @submit.prevent="handleLogin()"
    />
  </div>
</template>

<style scoped></style>
