// TasK:
// Curried Sum
// Implement add(a) that returns an arrow function expecting b, returning a + b.
// Example: add(5)(7) → 12.
// Bonus: add(5)() should return NaN (don’t add extra checks).

const add = (a) => (b) => a + b;

console.log(add(5)(7));
console.log(add(5)());