import { closeTestDbConnectionAsync, openTestDbConnectionAsync } from './src/utils/test-utils';

class AgendaDummy {
  constructor() {}

  define() {}
  every() {}
  on() {}
  schedule() {}
}

jest.mock('agenda', () => AgendaDummy);

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
