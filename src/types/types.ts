import { DefaultBodyType } from "msw";

export interface ITodoItemType {
  id: number;
  title: string;
}

export interface ITodoFormType {
  title: string;
}

export interface IPaginationType {
  pageIndex: number;
  pageSize: number;
}

export interface ISortingType extends IPaginationType {
  sort: string;
}
