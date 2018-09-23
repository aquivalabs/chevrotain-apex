"use strict";

const ENABLE_COVERAGE = false; // !!process.env.CI;

module.exports = {
  displayName: "test",
  testURL: "http://localhost",
  // setupFiles: ["<rootDir>/tests_config/run_spec.js"],
  snapshotSerializers: ["<rootDir>/tests_config/raw-serializer.js"],
  // testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
  testRegex: ".*-test\\.js$",
  collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: ["src/**/*.js", "!<rootDir>/node_modules/"],
  transform: {}
};
