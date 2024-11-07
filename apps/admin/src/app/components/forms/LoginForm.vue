
<script setup lang="ts">
import { LoginRequest } from '@open-assistant/types';

const loginRequest: LoginRequest = {
  username: '',
  password: '',
  rememberMe: false
};
</script>

<template>
  <form
    class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
    @submit.prevent="$emit('submit', loginRequest)"
  >
    <h2 class="text-lg font-bold mb-4">
      Login
    </h2>
    <div class="mb-4">
      <label
        for="username"
        class="block text-gray-700 text-sm font-bold mb-2"
      >Username</label>
      <input
        id="username"
        v-model="loginRequest.username"
        type="email"
        class="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter your username"
      >
    </div>
    <div class="mb-4">
      <label
        for="password"
        class="block text-gray-700 text-sm font-bold mb-2"
      >Password</label>
      <input
        id="password"
        v-model="loginRequest.password"
        type="password"
        class="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter your password"
      >
    </div>
    <div class="mb-4">
      <input
        id="rememberMe"
        v-model="loginRequest.rememberMe"
        type="checkbox"
        class="mr-2"
      >
      <label
        for="rememberMe"
        class="text-gray-700 text-sm font-bold"
      >Remember me</label>
    </div>
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Login
    </button>
  </form>
</template>
