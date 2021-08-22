module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
};
