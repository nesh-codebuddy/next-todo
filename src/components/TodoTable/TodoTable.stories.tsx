import type { Meta, StoryObj } from "@storybook/react";
import TodoTable from "./TodoTable";
import { fn } from "@storybook/test";

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
        basePath: "/#table-view",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "no",
        },
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
        basePath: "/#table-view",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "asc",
        },
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
        basePath: "/#table-view",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "desc",
        },
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
