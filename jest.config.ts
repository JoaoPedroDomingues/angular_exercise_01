module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    transform: {
      '^.+\\.(ts|html)$': 'ts-jest',
    },
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
    ],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        astTransformers: [
          'jest-preset-angular/InlineHtmlStripStylesTransformer',
        ],
      },
    },
  };