<template>
  <div>
    <div v-if="store.loading" class="mt-5">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <div v-if="store.items.length > 0">
        <b-table
          hover
          responsive
          :fields="fields"
          :items="store.items"
          class="mt-5"
          primary-key="_id"
        >
          <template v-slot:cell(_id)="cell">{{ cell.index + 1 }}</template>
          <template v-slot:cell(orignalUrl)="cell">{{ cell.value }}</template>
          <template v-slot:cell(shortUrl)="cell">
            <a :href="cell.value" target="_blank" rel="noopener noreferrer">{{ cell.value }}</a>
          </template>
          <template v-slot:cell(createdOn)="cell">{{ cell.value.split('T')[0] }}</template>
          <template v-slot:cell(__v)="cell">
            <b-button size="sm" @click="copyToClipboard(cell.item.shortUrl)">Copy</b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="store.pageNumber"
          :total-rows="store.totalRows"
          :per-page="10"
          aria-controls="my-table"
          @change="onPagination"
        ></b-pagination>
      </div>
      <div v-else class="mt-5">
        <h4>No data available</h4>
        <small id="emailHelp" class="form-text text-muted">Use above form to generate short links.</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import loadData from '@/store/action-types';
import { Store } from '../store/types';

export default Vue.extend({
  data: () => ({
    fields: [
      { key: '_id', label: 'S.No' },
      { key: 'orignalUrl', label: 'Url' },
      { key: 'shortUrl', label: 'Short Url' },
      { key: 'createdOn', label: 'Created On' },
      { key: '__v', label: 'Action' },
    ],
  }),
  computed: mapState<Store>({
    store: (state: Store) => state,
  }),
  methods: {
    async loadData(pageNumber?: number) {
      await this.$store.dispatch({
        type: loadData,
        pageNumber,
      });
    },
    async onPagination(pageNumber: number) {
      await this.loadData(pageNumber);
    },
    async copyToClipboard(shortUrl: string) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        this.$bvToast.toast('Copied to clipboard', {
          title: 'Success',
          autoHideDelay: 3000,
          variant: 'success',
        });
      } catch (error) {
        this.$bvToast.toast('Could not Copy to clipboard', {
          title: 'Error',
          autoHideDelay: 3000,
          variant: 'danger',
        });
      }
    },
  },
  async created() {
    await this.loadData();
  },
});
</script>
