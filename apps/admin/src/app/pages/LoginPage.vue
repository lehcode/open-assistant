<script setup lang="ts">
import { LoginRequest } from "@lib/shared";
import LoginForm from "admin/src/app/components/forms/LoginForm.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { LocalStorageService } from "../services/local-storage,service";
import pinia from "../stores/base.store";
import { useUserStore } from "../stores/user.store";


const userStore = useUserStore(pinia);
const auth = useAuth();
const router = useRouter();
const localStorageService = new LocalStorageService();

/**
 * Handles a login request.
 * 
 * @param {LoginRequest} formData - The form data.
 * @throws {Error} If the login fails.
 */
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
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo -->
      <div class="flex justify-center">
        <span class="text-4xl text-indigo-600">≋</span>
      </div>

      <!-- Sign in form -->
      <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 class="text-center text-2xl font-semibold text-gray-900 mb-8">
          Sign in to your account
        </h2>
        <LoginForm @submit="handleLogin" />
      </div>

      <!-- Trial offer -->
      <p class="text-center text-sm text-gray-600">
        Not a member?
        <router-link 
          to="/register" 
          class="font-medium text-indigo-600 hover:text-indigo-500">
          Start a 14 day free trial
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
