import { mount } from '@vue/test-utils';
import AddConfigPage from './AppConfigPage.vue';

describe('AddConfigPage', () => {
  it('renders properly', () => {
    const wrapper = mount(AddConfigPage, {});
    expect(wrapper.text()).toContain('Welcome to AddConfigPage');
  });
});
