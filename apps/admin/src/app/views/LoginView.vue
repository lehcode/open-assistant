<script setup lang="ts">
import { reactive } from "vue";
import LoginForm from "../components/forms/LoginForm.vue";
import { useAuth } from "../composables/auth";
import { LoginRequest } from "@open-assistant/types";
import { useRouter } from "vue-router";

const loginRequest = reactive({
  username: "",
  password: "",
  rememberMe: false
});
const router = useRouter();

const handleLogin = async (formData: LoginRequest) => {
  try {
    debugger;
    const result = await useAuth().provideLogin(formData);

    if (result.success) {
      debugger;
      // redirect to dashboard
      router.push('/dashboard');
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<template>
  <main className="min-h-screen bg-gray-100">
    <LoginForm
      :request-data="loginRequest"
      @submit="handleLogin"
    />
  </main>
</template>
