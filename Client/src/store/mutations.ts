import { MutationTree } from 'vuex';

import { Store, GridData } from './types';
import { loadData, markLoading } from './mutation-types';

const mutationTree: MutationTree<Store> = {
  [loadData](state, data: GridData) {
    state.items = data.items;
    state.totalRows = data.totalRows;
    state.loading = false;
  },
  [markLoading](state) {
    state.loading = true;
  },
};

export default mutationTree;
