import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DashboardPage from './DashboardPage.vue';

describe('DashboardPage', () => {
  it('renders properly', () => {
    const wrapper = mount(DashboardPage);

    // Check if the component renders
    expect(wrapper.exists()).toBe(true);
    
    // Check for the presence of key elements
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain("Welcome back, here's what's happening today.");
    
    // Check for the presence of stats
    expect(wrapper.text()).toContain('Total Revenue');
    expect(wrapper.text()).toContain('Active Users');
    expect(wrapper.text()).toContain('Recent Sales');
    
    // Check for the presence of recent activity
    expect(wrapper.text()).toContain('Recent Activity');
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('Jane Smith');
    expect(wrapper.text()).toContain('Mike Johnson');
  });

  // Add more specific tests as needed
  it('has the correct structure', () => {
    const wrapper = mount(DashboardPage);
    
    // Check if there's a h1 element with 'Dashboard'
    expect(wrapper.find('h1').text()).toBe('Dashboard');
    
    // Check if there are stat elements
    expect(wrapper.findAll('.bg-white.p-6.rounded-lg.shadow-sm').length).toBe(3);
    
    // Check if there's a recent activity section
    expect(wrapper.find('h2').text()).toBe('Recent Activity');
  });
});
