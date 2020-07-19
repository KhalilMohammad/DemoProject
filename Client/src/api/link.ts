import { GridData } from '@/store/types';

import ky from './baseApi';

const endPoint = 'link';

export const getAllLinks = (pageNumber = 1) =>
  ky
    .get(endPoint, {
      searchParams: { pageNumber },
    })
    .json<GridData>();

export const createLink = (orignalUrl: string) => ky.post(endPoint, { searchParams: { orignalUrl } });
