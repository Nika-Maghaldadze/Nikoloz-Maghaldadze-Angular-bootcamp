// Task:
// Digit Sum (Recursive)
// Implement digitSum(n) that returns the sum of the digits of a positive integer n.
// You must use recursion (no loops allowed in this one).
// Example: digitSum(5027) → 14.

function digitSum(n) {
  if (isNaN(n) || n < 0) {throw new TypeError("Only positive numbers are allowed");}
  if (n < 10) {return n;}
  return (n % 10) + digitSum(Math.floor(n / 10));
}

console.log(digitSum(5027));