// Task:
// Capitalize Each Word Write a function named capitalizeWords. It must take one parameter named str (a string).
// The function must return a new string where: The first letter of each word is converted to uppercase.
// The remaining letters of each word are converted to lowercase.
// Example: Input: "hello world from js" Output: "Hello World From Js"

function capitalizeWords(str) {
  if (typeof str !== 'string') {
    throw new Error("Input must be a string!");
  }

  let result = '';
  let newWord = true;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === ' ') {
      result += char;
      newWord = true;
    } else {
      if (newWord) {
        result += char.toUpperCase();
        newWord = false;
      } else {
        result += char.toLowerCase();
      }
    }
  }

  return result;
}

console.log(capitalizeWords("hello world from js"));