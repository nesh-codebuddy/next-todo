import type { Meta, StoryObj } from "@storybook/react";

import AddTodo from "./AddTodo";
import { fn } from "@storybook/test";

const meta = {
  component: AddTodo,
  args: {
    onCreate: fn(),
  },
} satisfies Meta<typeof AddTodo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // onCreate: () => {},
  },
};
