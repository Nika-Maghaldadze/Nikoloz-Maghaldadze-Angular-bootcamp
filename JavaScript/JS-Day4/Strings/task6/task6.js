// Task:
// Remove Duplicate Characters Write a function named removeDuplicates. It must take one parameter named str (a string).
// The function must return a new string where duplicate characters are removed.
// Only the first occurrence of each character must be kept. Example: Input: "programming" Output: "progamin"

function removeDuplicates(str) {
  if (typeof str !== 'string') {
    throw new Error("Input must be a string!");
  }
  if (str.length === 0) {
    return '';
  }

  let final = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
	
    let added = false;
    for (let j = 0; j < final.length; j++) {
      if (final[j] === char) {
        added = true;
        break;
      }
    }
    if (!added) {
      final += char;
    }
  }

  return final;
}


console.log(removeDuplicates("programming"));
console.log(removeDuplicates("hello"));
console.log(removeDuplicates("aabbcc"));
console.log(removeDuplicates(""));