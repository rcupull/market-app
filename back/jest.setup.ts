import {
  closeTestDbConnectionAsync,
  openTestDbConnectionAsync,
} from "./src/utils/test-utils";

global.beforeAll(async () => {
  await openTestDbConnectionAsync();
});

global.afterAll(async () => {
  await closeTestDbConnectionAsync();
});
