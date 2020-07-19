import { ParsedQs } from "qs";

export interface ILinkQuery extends ParsedQs {
  orignalUrl: string;
}

export interface IPaginationQuery extends ParsedQs {
  pageNumber: string;
  pageSize: string;
}
