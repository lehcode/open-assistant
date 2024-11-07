import { mount } from '@vue/test-utils';
import AppLayout from '../components/layout/AppLayout.vue';

describe('AppLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(AppLayout, {});
    expect(wrapper.text()).toContain('Welcome to AppLayout');
  });
});
