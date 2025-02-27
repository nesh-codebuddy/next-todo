import type { Meta, StoryObj } from "@storybook/react";

import Index from "./index";

const meta = {
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TableView: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/#table-view",
        asPath: "/#table-view",
        query: {
          pageIndex: 1,
          pageSize: 5,
          sort: "no",
        },
      },
    },
  },
};

export const PaginatedTable: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/#table-view",
        asPath: "/#table-view",
        query: {
          pageIndex: 1,
          pageSize: 10,
          sort: "no",
        },
      },
    },
  },
};
