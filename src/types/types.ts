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

export interface UserType {
  username: string;
  email: string;
}

export interface UserStoreType {
  username: string;
  email: string;
  updateUserdata: (userData: UserType ) => void;
}
