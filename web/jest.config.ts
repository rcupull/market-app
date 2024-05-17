import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    'icons/(.*)': '<rootDir>/src/icons/$1',
    'components/(.*)': '<rootDir>/src/components/$1',
    'features/(.*)': '<rootDir>/src/features/$1',
    'hooks/(.*)': '<rootDir>/src/hooks/$1',
    'pages/(.*)': '<rootDir>/src/pages/$1',
    'types/(.*)': '<rootDir>/src/types/$1',
    'utils/(.*)': '<rootDir>/src/utils/$1',
    'constants/(.*)': '<rootDir>/src/constants/$1',
    'media/(.*)': '<rootDir>/src/media/$1',
  },
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
