import { mount } from '@vue/test-utils';
import DashboardPage from './DashboardPage.vue';

describe('DashboardPage', () => {
  it('renders properly', () => {
    const wrapper = mount(DashboardPage, {});
    expect(wrapper.text()).toContain('Welcome to DashboardPage');
  });
});
