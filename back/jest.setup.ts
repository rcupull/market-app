import { closeTestDbConnectionAsync, openTestDbConnectionAsync } from './src/utils/test-utils';

global.beforeAll(async () => {
  await openTestDbConnectionAsync();
});

global.afterAll(async () => {
  await closeTestDbConnectionAsync();
});

global.afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.resetAllMocks();
});
