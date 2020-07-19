import Vue from 'vue';
import Vuex from 'vuex';

import actions from "./action";
import mutations from './mutations';
import { Store } from './types';

Vue.use(Vuex);

export default new Vuex.Store<Store>({
  state: {
    items: [],
    pageNumber: 1,
    totalRows: 0,
    loading: false
  },
  mutations,
  actions,
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production'
});
