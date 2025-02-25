import type { Meta, StoryObj } from '@storybook/react';

import New from './new';

const meta = {
  component: New,
} satisfies Meta<typeof New>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};