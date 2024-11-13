import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import AppConfigPage from './AppConfigPage.vue';

describe('AppConfigPage', () => {
  it('renders properly', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: AppConfigPage }]
    });

    const wrapper = mount(AppConfigPage, {
      global: {
        plugins: [router]
      }
    });

    await router.isReady();

    expect(wrapper.text()).toContain('Welcome to AppConfigPage!');
  });

  // Add more tests as needed
  it('has the correct structure', () => {
    const wrapper = mount(AppConfigPage);
    
    // Check if there's a paragraph element
    expect(wrapper.find('p').exists()).toBe(true);
    
    // Check the content of the paragraph
    expect(wrapper.find('p').text()).toBe('Welcome to AppConfigPage!');
  });
});
