import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
  testPathIgnorePatterns: ["build"],
  maxWorkers: 1,
};

export default config;
