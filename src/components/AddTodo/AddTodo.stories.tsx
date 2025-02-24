import type { Meta, StoryObj } from "@storybook/react";

import AddTodo from "./AddTodo";

const meta = {
  component: AddTodo,
} satisfies Meta<typeof AddTodo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCreate: () => {},
  },
};
