'use strict'
// 4.Merge Two Objects (Manual Merge)
// Write a function mergeObjects(obj1, obj2) that:
// Creates a new object, copies all properties from obj1, then from obj2.
// If the same property exists in both, keep the value from obj2.
// Do not use Object.assign or spread syntax {...obj1, ...obj2} — implement with loops

function mergeObjects(obj1, obj2) {
  if (typeof obj1 !== "object" || typeof obj2 !== "object" || !obj1 || !obj2) {
    throw new TypeError("both must be objects and can't be nulls!");
  }

  const result = {};
  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      result[key] = obj1[key];
    }
  }
  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      result[key] = obj2[key];
    }
  }
  return result;
}
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }));