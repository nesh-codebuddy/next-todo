import type { Meta, StoryObj } from "@storybook/react";

import TopMenu from "./TopMenu";

const meta = {
  component: TopMenu,
} satisfies Meta<typeof TopMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
