// Task4:
// Longest Word Finder Write a function named longestWord. 
// It must take one parameter named str (a string representing a sentence).
// The function must return the longest word in the sentence.
// If there are multiple words with the same maximum length,
// return the first one that appears.
// Example: Input: "I am learning JavaScript" Output: "JavaScript"


function longestWord(str) {
  if (typeof str !== 'string') throw new Error("Input must be a string!");
  if (!str.length) throw new Error("Please enter a string");

  const words = str.split(' ');
  let longest = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  return longest;
}

console.log(longestWord("I am learning JavaScript"));
console.log(longestWord("This is a test sentence"));
console.log(longestWord("Hi"));
console.log(longestWord(""));