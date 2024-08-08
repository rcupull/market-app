import type { Config } from 'jest';

const config: Config = {
  prettierPath: require.resolve('prettier-2'),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  verbose: true,
  maxWorkers: 4,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    'icons/(.*)': '<rootDir>/src/icons/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    'features/(.*)': '<rootDir>/src/features/$1',
    '^hooks/(.*)': '<rootDir>/src/hooks/$1',
    'pages/(.*)': '<rootDir>/src/pages/$1',
    'types/(.*)': '<rootDir>/src/types/$1',
    'utils/(.*)': '<rootDir>/src/utils/$1',
    'constants/(.*)': '<rootDir>/src/constants/$1',
    'media/(.*)': '<rootDir>/src/media/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
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
