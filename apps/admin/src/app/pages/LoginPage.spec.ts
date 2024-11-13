import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './LoginPage.vue';

// Mock the composables and services
vi.mock('../composables/useAuth', () => ({
  useAuth: vi.fn(() => ({
    provideLogin: vi.fn(),
  }))
}));

vi.mock('../services/local-storage,service', () => ({
  LocalStorageService: vi.fn(() => ({
    storeUserToken: vi.fn(),
    storeUserUsername: vi.fn(),
  }))
}));

describe('LoginPage', () => {
  it('renders properly', async () => {
    // Create a mock router
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: LoginPage }]
    });

    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: true
        }
      }
    });

    // Wait for the component to update
    await wrapper.vm.$nextTick();

    // Check for the presence of key elements
    expect(wrapper.find('h2').text()).toBe('Sign in to your account');
    
    // Instead of checking for LoginForm component, check for form elements
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);

    expect(wrapper.text()).toContain('Not a member?');
    expect(wrapper.text()).toContain('Sign in to your account');
  });
});
