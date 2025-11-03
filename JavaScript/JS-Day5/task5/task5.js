'use strict'
// 5.Swap Keys and Values
// Write invert(obj) that returns a new object with keys and values swapped.
// Example:
// { a: 1, b: 2, c: 3 } → { 1: "a", 2: "b", 3: "c" }

function invert(obj) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("Argument must be an object");
  }
  const inverted = {};
  for (const [key, value] of Object.entries(obj)) {
    inverted[value] = key;
  }
  return inverted;
}
console.log(invert({ a: 1, b: 2, c: 3 }));