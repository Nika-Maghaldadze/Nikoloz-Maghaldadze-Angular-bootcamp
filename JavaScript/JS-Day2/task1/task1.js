// Task:
// Safe Division Write a function divide(a, b) that: * Returns the result of a / b.
// If b = 0, throw an error "Division by zero is not allowed".
// If fn params aren't valid numbers or can't be parsed to number should throw error type error with message "Only numbers are allowed"
// Handle the error with try…catch and print a user-friendly message.

function divide(a, b) {
  if (isNaN(a) || isNaN(b)) {throw new TypeError("Enter only numbers!");}
  if (b === 0) {throw new Error("Division by zero is not allowed!");}
  return a / b;
}

try {
  let result = divide(10, 0);
  console.log("Result:", result);
} catch (error) {
  console.log("Error: ", error.message);
}
