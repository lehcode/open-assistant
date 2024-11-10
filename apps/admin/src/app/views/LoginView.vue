<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/forms/LoginForm.vue";
import { useAuth } from "../composables/useAuth";
import { LoginRequest } from "@lib/shared";
import { useUserStore } from "../stores/user.store";


const messageStore = useUserStore();

let validUser = ref(false);

const handleLogin = async (formData: LoginRequest) => {
  try {
    const result = await useAuth().provideLogin(formData);

    debugger;

    if (result.success) {
      validUser.value = true;
      messageStore.updateAuthorized(true);
    } else {
      messageStore.updateAuthorized(false);
    }
  } catch (error: any) {
    throw new Error("Login failed:", error.message);
  }
};
</script>

<template>
  <main className="min-h-screen bg-gray-100">
    <LoginPage title="login" />
  </main>
</template>
