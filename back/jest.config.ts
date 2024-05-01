import type { Config } from "jest";

process.env["APP_CONFIG_PATH"] = "../app-config.json";

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
  testPathIgnorePatterns: ["build"],
  maxWorkers: 1,
  testEnvironment: "node",
};

export default config;
