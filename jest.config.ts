import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts', '**/*.integration-spec.ts', '**/*.e2e-spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  modulePathIgnorePatterns: ['<rootDir>/test/'],
};

export default config;
