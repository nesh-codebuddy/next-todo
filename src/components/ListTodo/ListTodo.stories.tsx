import type { Meta, StoryObj } from "@storybook/react";

import ListTodo from "./ListTodo";
import { fn } from "@storybook/test";

const meta = {
  component: ListTodo,
  args: {
    deleteTodo: fn(),
    editTodo: fn(),
  },
} satisfies Meta<typeof ListTodo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todo: {
      id: 1,
      title: "This is a sample todo",
    },
  },
};
