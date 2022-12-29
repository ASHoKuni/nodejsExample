module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node'
    ],
    // setupFiles: ['<rootDir>/test-teardown-globals.js'],
    verbose: true,
    coverageDirectory: "/Users/ashokdhokare/Documents/nodejs/test/",
    coverageReporters: ["html","text"],
    coverageThreshold: {
    global: {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
          }
        }
};