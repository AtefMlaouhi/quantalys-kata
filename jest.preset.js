const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  reporters: [['github-actions', { silent: false }], 'summary'],
  coverageReporters: [
    'html',
    'clover',
    'json',
    'lcov',
    ['text', { skipFull: true }],
  ],
};
