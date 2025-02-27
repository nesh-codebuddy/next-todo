import type { Meta, StoryObj } from "@storybook/react";
import TodoTable from "./TodoTable";
import { fn } from "@storybook/test";

const paginatedData = [
  {
    id: 1,
    title: "This is the first todo",
  },
  {
    id: 2,
    title: "This is the second todo",
  },
  {
    id: 3,
    title: "This is the third todo",
  },
  {
    id: 4,
    title: "This is the fourth todo",
  },
  {
    id: 5,
    title: "This is the fifth todo",
  },
  {
    id: 6,
    title: "This is the sixth todo",
  },
];

const meta = {
  component: TodoTable,
  tags: ["autodocs"],
  parameters: {
    query: {
      pageIndex: 1,
      pageSize: 5,
      sort: "no",
    },
  },
  args: {
    deleteTodo: fn(),
    setApiError: fn(),
  },
} satisfies Meta<typeof TodoTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todoList: [{ id: 1, title: "This is a sample todo" }],
    isSearch: false,
  },
  parameters: {
    nextjs: {
      router: {
        basePath: "/",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "no",
        },
        hash: "table-view",
      },
    },
  },
};

export const AscSorting: Story = {
  args: {
    todoList: [{ id: 1, title: "This is a sample todo" }],
    isSearch: false,
  },
  parameters: {
    nextjs: {
      router: {
        basePath: "/",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "asc",
        },
        hash: "table-view",
      },
    },
  },
};

export const DescSorting: Story = {
  args: {
    todoList: [{ id: 1, title: "This is a sample todo" }],
    isSearch: false,
  },
  parameters: {
    nextjs: {
      router: {
        basePath: "/",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "desc",
        },
        hash: "table-view",
      },
    },
  },
};

export const SearchedData: Story = {
  args: {
    todoList: [
      { id: 1, title: "This is a sample todo" },
      { id: 2, title: "First" },
    ],
    isSearch: true,
  },
};

export const PaginatedData: Story = {
  args: {
    todoList: [{ id: 1, title: "This is a sample todo" }],
    isSearch: false,
  },
  parameters: {
    nextjs: {
      router: {
        basePath: "/",
        query: {
          pageIndex: 1,
          pageSize: 10,
          sort: "asc",
        },
        hash: "table-view",
      },
    },
  },
};
