global.structuredClone = (json) => JSON.parse(JSON.stringify(json));

global.beforeAll(async () => {
  global.DEVELOPMENT = true;
});

global.afterAll(async () => {});

global.afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.resetAllMocks();
});
