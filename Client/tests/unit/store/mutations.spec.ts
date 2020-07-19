import { Store, GridData } from "../../../src/store/types";
import mutations from '../../../src/store/mutations';

// destructure assign `mutations`
const { loadData, markLoading } = mutations;

describe('mutations', () => {
  it('loadData', () => {
    // mock state
    const state: Store = { items: [], pageNumber: 1, totalRows: 0, loading: false };
    const payload: GridData = {
      items: [
        {
          createdOn: '2020-07-17',
          orignalUrl: 'https://google.com',
          shortUrl: 'https://pbid.io/lgoogeJP',
        },
      ],
      totalRows: 1,
      loading: false,
    };
    // apply mutation
    loadData(state, payload);
    // assert result
    expect(state.items).toEqual(payload.items);
    expect(state.totalRows).toBe(payload.totalRows);
    expect(state.loading).toBe(false);
  });

  it('markLoading', () => {
    // mock state
    const state: Store = { items: [], pageNumber: 1, totalRows: 0, loading: false };
    // apply mutation
    markLoading(state);
    // assert result
    expect(state.loading).toBe(true);
  });
});
