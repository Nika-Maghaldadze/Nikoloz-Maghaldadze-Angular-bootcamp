// Sum Until Negative
// Write a function named sumUntilNegative. It must use a do...while loop to repeatedly ask the user for a number. Keep a variable named sum to store the running total.
// If the entered number is non-negative → add it to sum.
// If the entered number is negative → stop the loop.
// After the loop ends, print the final value of sum.

function sumUntilNegative() {
  let sum = 0;
  let number;
  do {
    number = Number(prompt("Enter a number (negative to stop):"));
    if (number >= 0) {
      sum += number;
    }
  } while (number >= 0);

  console.log("Final result:", sum);
}