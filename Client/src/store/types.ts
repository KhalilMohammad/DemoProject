export interface RowData {
  orignalUrl: string;
  shortUrl: string;
  createdOn: string;
}

export interface GridData {
  items: RowData[];
  totalRows: number;
  loading: boolean;
}


export interface Store extends GridData {
  pageNumber: number;
}



