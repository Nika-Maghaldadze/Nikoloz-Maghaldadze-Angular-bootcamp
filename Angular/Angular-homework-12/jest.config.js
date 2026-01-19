require('ts-node/register/transpile-only');

const cfg = require('./jest.config.ts');
module.exports = cfg.default ?? cfg;
