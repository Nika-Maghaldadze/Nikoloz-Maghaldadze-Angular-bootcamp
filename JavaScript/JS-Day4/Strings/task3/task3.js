// Task:
// Find the First Non-Repeating Character
// Write a function named firstUniqueChar. It must take one parameter named str (a string).
// The function must return the first character in str that does not repeat anywhere else in the string.
// If all characters repeat, return null.
// Example:
// Input: "aabbcde" → Output: "c"
// Input: "aabbcc" → Output: null

function firstUniqueChar(str) {
  if (typeof str !== 'string') {
    throw new Error("Input must be a string!");
  }
  if (str.length === 0) {
    throw new Error("Please enter a string");
  }

  const freq = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (freq[char] === undefined) {
      freq[char] = 1;
    } else {
      freq[char] = freq[char] + 1;
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (freq[str[i]] === 1) {
      return str[i];
    }
  }

  return null;
}

console.log(firstUniqueChar("aabbcde"));
console.log(firstUniqueChar("aabbcc"));
console.log(firstUniqueChar("swiss"));

