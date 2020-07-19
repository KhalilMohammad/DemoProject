<template>
  <div>
    <h3>Get shortened 8 digit code url</h3>
    <b-form inline>
      <label class="sr-only" for="orignalUrl">Url</label>
      <b-input
        id="orignalUrl"
        v-model="orignalUrl"
        type="url"
        required
        placeholder="Enter Url"
        class="offset-1 col-9 mb-2 mr-sm-3 mb-sm-0"
      ></b-input>

      <b-button
        type="button"
        variant="primary"
        @click="onClick"
        :disabled="orignalUrl.length === 0"
      >Submit</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ky from 'ky';

import loadData from '@/store/action-types';
import { createLink } from '@/api/link';

export default Vue.extend({
  data() {
    return {
      orignalUrl: '',
    };
  },
  methods: {
    async onClick(evt: Event) {
      evt.preventDefault();
      let { orignalUrl } = this;
      if (!orignalUrl.includes('http')) orignalUrl = `https://${orignalUrl}`;

      try {
        const response = await createLink(orignalUrl);
        if (response.status === 200) {
          this.$bvToast.toast('Short url generated', {
            title: 'Success',
            autoHideDelay: 3000,
            variant: 'success',
          });
          this.orignalUrl = '';
          await this.$store.dispatch({
            type: loadData,
          });
        }
      } catch (error) {
        if (error instanceof ky.HTTPError) {
          const { response } = error;
          const text = await response.text();
          this.$bvToast.toast(text, {
            title: response.status === 500 ? 'Error occured' : 'Validation failed!',
            autoHideDelay: 3000,
            variant: 'danger',
          });
        }
      }
    },
  },
});
</script>

<style scoped>
#orignalUrl {
  border-radius: 1rem;
}
</style>
