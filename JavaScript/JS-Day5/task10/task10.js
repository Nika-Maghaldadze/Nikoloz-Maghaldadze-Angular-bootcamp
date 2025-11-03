'use strict'
// 10.Nested Merge (bonus)
// Given:
// const base = { profile: { name: "Ana", age: 22 } };
// const update = { profile: { age: 23 } };
// Merge objects so that all properties preserve

function deepMerge(base, update) {
  if (typeof base !== "object" || base === null) return update;
  if (typeof update !== "object" || update === null) return base;

  const result = Array.isArray(base) ? [...base] : { ...base };

  for (const key in update) {
    if (Object.prototype.hasOwnProperty.call(update, key)) {
      if (typeof update[key] === "object" && update[key] !== null) {
        result[key] = deepMerge(base[key] ?? {}, update[key]);
      } else {
        result[key] = update[key];
      }
    }
  }
  return result;
}
const base = { profile: { name: "Ana", age: 22 } };
const update = { profile: { age: 23 } };
console.log(deepMerge(base, update));