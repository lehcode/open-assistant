import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

describe('App', () => {
  it('renders properly', async () => {
    // Create a mock router
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        // Add your routes here
        { path: '/', component: { template: '<div>Home</div>' } },
      ],
    });

    // Mount the component with the router
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
          RouterLink: true,
        },
      },
    });

    // Wait for the router to be ready
    await router.isReady();

    // Check if the component renders
    expect(wrapper.exists()).toBe(true);

    // Now you can make your assertions
    // expect(wrapper.text()).toContain('Welcome admin 👋');
  });
});
