


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