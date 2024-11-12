import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from './AppLayout.vue';

// Mock the user store
vi.mock("../../stores/user.store", () => ({
  useUserStore: vi.fn(() => ({
    authenticated: true
  }))
}));

describe('AppLayout', () => {
  it('renders properly', async () => {
    // Create a mock router
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
      ],
    });

    // Mount the component with the router
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
          Navbar: true,
          Sidebar: true,
        },
      },
    });

    // Wait for the router to be ready
    await router.isReady();

    // Check if the component renders
    expect(wrapper.exists()).toBe(true);

    // Adjust this expectation based on the actual content of AppLayout
    // expect(wrapper.text()).toContain('Welcome to AppLayout');
  });
});
