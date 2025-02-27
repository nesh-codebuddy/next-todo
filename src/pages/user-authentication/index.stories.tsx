import type { Meta, StoryObj } from "@storybook/react";

import Index from "./index";
import { fn } from "@storybook/test";
import { UseFormRegister } from "react-hook-form";
import { ITodoFormType, ITodoItemType } from "@/types/types";

const meta = {
  component: Index,
  args: {
    // register: fn<UseFormRegister<ITodoFormType> | UseFormRegister<ITodoItemType>>(),
    // register: fn(),
    // onsubmit: fn(),
  },
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: {},
    isEdit: false,
    register: () => {},
    onSubmit: () => {},
  },
};
