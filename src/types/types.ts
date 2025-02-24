import { DefaultBodyType } from "msw";

export interface TodoItemType {
  id: number;
  title: string;
}

export interface TodoFormType {
  title: string;
}

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export interface SortingType extends PaginationType {
  sort: string;
}
