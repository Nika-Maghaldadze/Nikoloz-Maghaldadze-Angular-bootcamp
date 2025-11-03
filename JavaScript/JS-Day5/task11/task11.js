'use strict'
// 11.Path-Based Extractor
// Goal: Implement pluckPaths(obj, paths) where paths is an array like ["user.name", "meta.stats.count"]. Return a new object that only contains those paths (building missing containers).
// How: Parse path segments, create objects along the way.
// Edge Cases: Path into arrays (e.g., items.0.price) should work; skip non-existing paths silently.

function pluckPaths(obj, paths) {
  if (typeof obj !== "object" || obj === null) return {};
  if (!Array.isArray(paths)) throw new TypeError("Paths must be an array of strings");

  const result = {};

  for (const path of paths) {
    if (typeof path !== "string") continue;
    const keys = path.split(".");
    let src = obj;
    let dest = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!(key in src)) break;

      if (i === keys.length - 1) {
        dest[key] = src[key];
      } else {
        dest[key] = dest[key] || (Number.isInteger(+keys[i + 1]) ? [] : {});
        dest = dest[key];
        src = src[key];
      }
    }
  }
  return result;
}
const data = {
  user: { name: "Nika", age: 22 },
  meta: { stats: { count: 100, likes: 123 } },
};
console.log(pluckPaths(data, ["user.name", "meta.stats.count"]));