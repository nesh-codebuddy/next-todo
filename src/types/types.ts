import { DefaultBodyType } from "msw";

// Todo Item Type
export interface ITodoItemType {
  id: number;
  title: string;
}

//Todo Form type for Create/Edit of todo
export interface ITodoFormType {
  title: string;
}

// Pagination Type
export interface IPaginationType {
  pageIndex: number;
  pageSize: number;
}

// Sorting Type, passed to React Table
export interface ISortingType extends IPaginationType {
  sort: string;
}

//User Type for authenticating a user
export interface UserType {
  username: string;
  email: string;
}

// User Store Type used for zustand user slice.
export interface UserStoreType {
  username: string;
  email: string;
  updateUserdata: (userData: UserType ) => void;
}
