import type { Meta, StoryObj } from "@storybook/react";

import TodoTable from "./TodoTable";

const meta = {
  component: TodoTable,
} satisfies Meta<typeof TodoTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todoList: [{ id: 1, title: "This is a sample todo" }],
    deleteTodo: (id: number) => {},
    setApiError: () => {},
  },
};
