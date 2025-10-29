// Task:
// Replace All Digits with * Write a function named maskDigits. It must take one parameter named str (a string).
// The function must return a new string where every digit (0–9) in str is replaced with an asterisk *.
// All non-digit characters must remain unchanged. Example: Input: "My pin is 1234" Output: "My pin is ****"

function maskDigits(str) {
  if (typeof str !== 'string') throw new Error("Input must be a string!");
  return str.replace(/\d/g, '*');
}

console.log(maskDigits("My pin is 1234"));