// 7.Nested Property Access (Safe Getter)
// Write a function getValue(obj, path) that takes an object and a string path like "grades.math" and returns the value if it exists, otherwise undefined.
// Example:
// const student = { name: "Ana", grades: { math: 95 } };
// getValue(student, "grades.math") → 95
// getValue(student, "grades.physics") → undefined

function getValue(obj, path) {
  if (typeof obj !== "object" || obj === null) return undefined;
  if (typeof path !== "string") throw new TypeError("Path must be a string");

  return path.split(".").reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
}
const student = { name: "Ana", grades: { math: 95 } };
console.log(getValue(student, "grades.math"));