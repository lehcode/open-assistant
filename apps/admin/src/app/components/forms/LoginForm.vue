<script setup lang="ts">
import { LoginRequest } from "@libs/shared";
import { Lock, Mail } from "lucide-vue-next";
import { reactive, ref } from "vue";

const emit = defineEmits<{
  (e: "submit", formData: LoginRequest): void;
}>();
const showPassword = ref<boolean>(false);
const loginRequest = reactive<LoginRequest>({
  username: "",
  password: "",
  rememberMe: false
});
</script>

<template>
  <form
    class="space-y-6"
    @submit.prevent="emit('submit', loginRequest)">
    <div>
      <label
        for="email"
        class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail class-name="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="email"
          v-model="loginRequest.username"
          name="email"
          type="email"
          autoComplete="email"
          required
          class="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:border-blue-500 focus:ring-indigo-500 placeholder-gray-400 sm:text-sm"
          placeholder="your@email"
        />
      </div>
    </div>

    <div>
      <label
        for="password"
        class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock class-name="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="password"
          v-model="loginRequest.password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          autoComplete="current-password"
          required
          class="mt-1 block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
          placeholder="••••••••"
        />
      </div>
    </div>
    <div class="mb-4">
      <input
        id="rememberMe"
        v-model="loginRequest.rememberMe"
        type="checkbox"
        class="mr-2 rounded-sm border-gray-300 text-indigo-600 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <label
        for="rememberMe"
        class="text-gray-700 text-sm font-bold">Remember me</label>
    </div>
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Login
    </button>
  </form>
</template>
