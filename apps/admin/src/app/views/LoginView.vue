<script setup lang="ts">
import { AuthCredentials, LoginRequest, LoginResponse } from "@lib/shared";
import { useAuth } from "../composables/useAuth";


// let validUser = ref(false);

const emit = defineEmits<{
  (e: 'login', loginResponse: LoginResponse<AuthCredentials>): void
}>();

const handleLogin = async (formData: LoginRequest) => {
  try {
    const result = await useAuth().provideLogin(formData);
    
    if (result.success) {
      emit("login", result);
    //   validUser.value = true;
    //   messageStore.updateAuthorized(true);
    } else {
    //   messageStore.updateAuthorized(false);
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
