// Task:
// Reverse a String
// Write a function named reverseString. It must take one parameter named str (a string).
// The function must return a new string that is the reversed version of str.
// Example:
// Input: "hello"
// Output: "olleh"

function reverseString(str){
    return str.split('').reverse().join("");
}

console.log(reverseString("String"));
