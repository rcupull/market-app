import React from 'react'
import type { Preview } from "@storybook/react";
import "../src/index.css";
import { Providers } from '../src/providers'

const ProviderDecorator = (fn) => <Providers>{fn()}</Providers>

const preview: Preview = {
  decorators: [ProviderDecorator],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
