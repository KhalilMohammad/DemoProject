import LinkGrid from '@/components/LinkGrid.vue';
import { shallowMount } from '@vue/test-utils';

describe('LinkGrid.vue', () => {
  it('renders loading spinner', () => {
    const wrapper = shallowMount(LinkGrid, {
      computed: {
        store() {
          return { loading: true };
        },
      },
    });
    expect(wrapper.html()).toContain('Loading...');
  });

  it('renders the table', () => {
    const wrapper = shallowMount(LinkGrid, {
      computed: {
        store() {
          return {
            items: [{ orignalUrl: 'https://www.google.com/', value: 'https://www.google.com/' }],
          };
        },
      },
    });
    expect(wrapper.html()).toContain('table');
  });

  it('renders No data available text', () => {
    const wrapper = shallowMount(LinkGrid, {
      computed: {
        store() {
          return { items: [] };
        },
      },
    });
    expect(wrapper.html()).toContain('No data available');
  });
});
