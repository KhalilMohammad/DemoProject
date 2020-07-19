import { ActionTree, ActionContext } from 'vuex';
import { getAllLinks } from '@/api/link';

import { loadData, markLoading } from './mutation-types';
import { Store } from './types';

const actionTree: ActionTree<Store, Store> = {
  async loadData(context: ActionContext<Store, Store>, { pageNumber }: { pageNumber: number }) {
    context.commit(markLoading);

    const data = await getAllLinks(pageNumber);
    context.commit(loadData, data);
  },
};

export default actionTree;
