// Task:
// Reverse a String
// Write a function named reverseString. It must take one parameter named str (a string).
// The function must return a new string that is the reversed version of str.
// Example:
// Input: "hello"
// Output: "olleh"

function reverseString(str){
    if(typeof str !== 'string'){
        throw new Error("input must be type of string!");
    }
    if(str.length === 0){
        throw new Error("Please enter string");
    }
    return str.split('').reverse().join("");

// meore varianti
//
//      let reversed = '';
//      for (let i = str.length - 1; i >= 0; i--) {
//          reversed += str[i];
//      }
//      return reversed;
}

console.log(reverseString("String"));
