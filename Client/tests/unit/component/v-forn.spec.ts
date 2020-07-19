import VForm from '@/components/V-Form.vue';
import { shallowMount } from '@vue/test-utils';

describe('VForm.vue', () => {
  it('renders the form title', () => {
    const wrapper = shallowMount(VForm);
    expect(wrapper.html()).toContain('Get shortened 8 digit code url');
  });

  it('renders input field - Enter Url', () => {
    const wrapper = shallowMount(VForm);
    expect(wrapper.html()).toContain('Enter Url');
  });

  it('renders submit button', () => {
    const wrapper = shallowMount(VForm);
    expect(wrapper.html()).toContain('Submit');
  });
});
