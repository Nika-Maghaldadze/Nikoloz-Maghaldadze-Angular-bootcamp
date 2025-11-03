// 8.Remove All Falsy Values
// Write cleanObject(obj) that removes properties with falsy values (false, 0, "", null, undefined, NaN)
// Example:
// { a: 1, b: 0, c: "", d: "hi" } → { a: 1, d: "hi" }

function cleanObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("argument must be object!");
  }
  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value) clean[key] = value;
  }
  return clean;
}
console.log(cleanObject({ a: 1, b: 0, c: "", d: "hi", e: null }));