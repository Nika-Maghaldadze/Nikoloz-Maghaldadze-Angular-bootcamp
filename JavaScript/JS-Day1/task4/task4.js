// Task 1:
// Pattern Printing
// Write a function named printPattern. It must take one parameter named rows (integer). Use nested for loops to print a right-angled triangle pattern of stars * with rows number of lines.
// Example if rows = 4:
// * **

function printPattern(rows) {
  for (let i = 1; i <= rows; i++) {
    let pattern = '';
    for (let j = 1; j <= i; j++) {
      pattern += '*';
    }
    console.log(pattern);
  }
}

// Task 2:
// Prime Numbers in Range
// Write a function named printPrimesInRange. It must take two parameters named start and end.
// Use a for loop to go through each number from start to end.
// For each number, check if it is prime.
// Print only the prime numbers.
// Example if start = 2 and end = 10:
// 2 3 5 7

function printPrimesInRange(start, end) {
  for (let num = start; num <= end; num++) {
    if (num < 2) continue; 
    let isPrime = true;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) console.log(num);
  }
}
