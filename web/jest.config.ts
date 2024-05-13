import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        diagnostics: {
          exclude: ['**'],
        },
      },
    ],
  },
};

export default config;
