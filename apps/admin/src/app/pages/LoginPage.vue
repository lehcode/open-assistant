<script setup lang="ts">
import { LoginRequest } from '@lib/shared';
import LoginForm from 'admin/src/app/components/forms/LoginForm.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { LocalStorageService } from '../services/local-storage,service';
import pinia from "../stores/base.store";
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore(pinia);
const auth = useAuth();
const router = useRouter();
const localStorageService = new LocalStorageService();

const handleLogin = async (formData: LoginRequest) => {
  try {
    const result = await auth.provideLogin(formData);

    if (!result) {
      throw new Error("Login failed");
    }

    if (result.success) {
      userStore.updateAuthenticated(true);
      userStore.updateCredentials(result.data);
      
      localStorageService.storeUserToken(result.data.accessToken);
      localStorageService.storeUserUsername(result.data.userName);

      router.push({ name: "dashboard" });
    } else {
      throw new Error(result.error);
    }
  } catch (error: any) {
    throw new Error("Login failed:", error.message);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <LoginForm
      @submit="handleLogin"
    />
  </div>
</template>

<style scoped></style>
