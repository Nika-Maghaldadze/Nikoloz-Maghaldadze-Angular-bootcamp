'use strict'
// 3.Writable vs Non-Writable
// Create an object constants with PI: 3.14.
// Make PI non-writable using Object.defineProperty.
// Try to change constants.PI = 99 and show it fails.

const constants = {};
Object.defineProperty(constants, "PI", {
  value: 3.14,
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log(constants.PI);