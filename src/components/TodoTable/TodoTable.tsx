import { PaginationType, TodoItemType } from "@/types/types";
import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  getSortDirection,
  setSortingDirection,
  todoTableColumns,
} from "@/utils/helper";
import { Button, Table } from "@mantine/core";
import EditTodoModal from "../EditTodoModal/EditTodoModal";
import { useRouter } from "next/router";
import { Pagination, Select } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { paginationTodo } from "@/services/queries";
import { error } from "console";

interface TodoTableInterface {
  deleteTodo: (id: number) => void;
  todoList: Array<TodoItemType>;
  setApiError: React.Dispatch<React.SetStateAction<string>>;
  isSearch: boolean;
}

const TodoTable: React.FC<TodoTableInterface> = ({
  todoList,
  deleteTodo,
  setApiError,
  isSearch,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 1,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [paginatedTodo, setPaginatedTodo] = useState<Array<TodoItemType>>([]);
  const router = useRouter();

  const paginationMutation = useMutation({
    mutationFn: paginationTodo,
    onSuccess: (data) => {
      setPaginatedTodo(data.paginatedData);
    },
    onError: (error) => {
      setApiError(error.message);
    },
  });

  const { query } = router;

  useEffect(() => {
    if (query && query.pageIndex) {
      setPagination({
        pageIndex: parseInt(query.pageIndex?.toString()!),
        pageSize: parseInt(query.pageSize?.toString()!),
      });
      paginationMutation.mutate({
        pageIndex: parseInt(query.pageIndex?.toString()!),
        pageSize: parseInt(query.pageSize?.toString()!),
        sort: query.sort?.toString()!,
      });
    }
  }, [query, sorting]);

  useEffect(() => {
    const sortingDirection = setSortingDirection(query.sort?.toString()!);
    setSorting(sortingDirection);
  }, [query]);

  const todoTable = useReactTable({
    data: isSearch ? todoList : paginatedTodo,
    columns: todoTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableSortingRemoval: true,
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: (sortFn) => {
      const newVal = sortFn(sorting);
      setSorting(newVal);
      router.replace(
        {
          pathname: "/",
          hash: "#table-view",
          query: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            sort: getSortDirection(newVal),
          },
        },
        undefined,
        { shallow: true }
      );
    },
  });

  return (
    <div className="flex flex-col justify-between tableWrapper mt-6">
      <Table>
        <Table.Thead>
          {todoTable.getHeaderGroups().map((todo) => (
            <Table.Tr key={todo.id}>
              {todo.headers.map((header) => (
                <Table.Th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </Table.Th>
              ))}
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {todoTable.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
              <Table.Td>
                <div className="flex gap-2">
                  <Button
                    variant="filled"
                    color="violet"
                    onClick={() => {
                      setOpenModal(true);
                      router.push({
                        pathname: "/",
                        hash: "#table-view",
                        query: {
                          id: row.original.id,
                        },
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="filled"
                    color="red"
                    onClick={() => deleteTodo(row.original.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <EditTodoModal open={openModal} setOpen={setOpenModal} />
      {!isSearch && (
        <div className="flex flex-col sm:flex-row justify-center py-4 items-center">
          <Pagination
            total={Math.ceil(todoList.length / pagination.pageSize)}
            value={pagination.pageIndex}
            onChange={(page) => {
              setPagination({ ...pagination, pageIndex: page });
              router.replace(
                {
                  pathname: "/",
                  hash: "table-view",
                  query: {
                    pageIndex: page,
                    pageSize: pagination.pageSize,
                    sort: getSortDirection(sorting),
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
          <Select
            className="mt-4 sm:mt-0 sm:ml-4"
            size="xs"
            data={["5", "10", "15", "20"]}
            value={pagination.pageSize.toString()}
            onChange={(val) => {
              setPagination({
                ...pagination,
                pageSize: parseInt(val!),
              });
              router.replace(
                {
                  pathname: "/",
                  hash: "table-view",
                  query: {
                    pageIndex: pagination.pageIndex,
                    pageSize: val,
                    sort: getSortDirection(sorting),
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TodoTable;
