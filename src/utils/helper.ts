import { ITodoItemType } from "@/types/types";
import { createColumnHelper } from "@tanstack/react-table";

const todoTableColumnHelper = createColumnHelper<ITodoItemType>();

// Todo Table Columns
export const todoTableColumns = [
  todoTableColumnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID",
    enableSorting: false,
  }),
  todoTableColumnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "Todo",
    enableSorting: true,
    sortingFn: "text",
  }),
];

// Helper function to get the current sorting direction
export const getSortDirection = (val: Array<any>) => {
  let sortDirection = "no";
  if (val.length === 1) {
    const sortCol = val[0];
    sortDirection = sortCol.desc ? "desc" : "asc";
  }
  return sortDirection;
};

// Helper function to structure the sorting direction data
export const setSortingDirection = (val: string) => {
  if (val === "no") {
    return [];
  }
  if (val === "asc") {
    return [{ id: "title", desc: false }];
  }
  if (val === "desc") {
    return [{ id: "title", desc: true }];
  }
  return [];
};
