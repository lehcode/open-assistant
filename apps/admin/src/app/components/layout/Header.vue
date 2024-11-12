<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and primary nav -->
        <div class="flex items-center">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <span class="text-2xl text-indigo-600">≋</span>
          </div>
          
          <!-- Primary Nav -->
          <nav class="hidden md:ml-8 md:flex md:space-x-8">
            <router-link v-for="item in navItems" :key="item.name" :to="item.path" class="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Secondary Nav -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/login" class="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
            Sign in
          </router-link>
          <router-link to="/register" class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium">
            Get started
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <span class="sr-only">Open main menu</span>
            <!-- Menu icon -->
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link v-for="item in navItems" :key="item.name" :to="item.path" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500">
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
const navItems = [
  { name: 'Products', path: '/products' },
  { name: 'Features', path: '/features' },
  { name: 'Resources', path: '/resources' },
  { name: 'Pricing', path: '/pricing' },
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
