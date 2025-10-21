// Task 1:
// Minimum of Two Numbers
// Write a function named getMinimum. It must take two parameters named num1 and num2. Use a ternary operator to return the smaller of the two numbers.

function getMinimum(num1, num2){
    return (num1 > num2) ? num2 : num1;
}
console.log(getMinimum(1,2))

// Task 2:
// Absolute Value
// Write a function named getAbsoluteValue. It must take one parameter named number.
// Use a ternary operator to return the absolute value of number.

function getAbsoluteValue(number){
    return number < 0 ? -number : number;
}

console.log(getAbsoluteValue(-4));

// Task 3:
// Login Greeting
// Write a function named getLoginGreeting. It must take one parameter named isLoggedIn (boolean).
// If isLoggedIn is true → return "Welcome back!"
// Otherwise → return "Please log in."

function getLoginGreeting(isLoggedIn){
    return isLoggedIn ? "Welcome back!" : "Please log in."
}

console.log(getLoginGreeting(true));

// Even or Odd (Ternary Version)
// Write a function named checkEvenOrOddTernary. It must take one parameter named number.
// Use a ternary operator to return "Even" if number is even, otherwise return "Odd".

function checkEvenOrOddTernary(number){
    return (number % 2 === 0) ? "even" : "odd"
}

console.log(checkEvenOrOddTernary(6));
