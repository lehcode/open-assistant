import { mount } from '@vue/test-utils';
import LoginPage from './LoginPage.vue';

describe('LoginPage', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginPage, {});
    expect(wrapper.text()).toContain('Welcome to LoginPage');
  });
});
