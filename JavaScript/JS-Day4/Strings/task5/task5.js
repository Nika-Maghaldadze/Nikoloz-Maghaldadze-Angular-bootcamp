// Task:
// Check Anagram Write a function named isAnagram. It must take two parameters named str1 and str2 (both strings).
// The function must return true if str1 and str2 contain exactly the same letters in any order.
// Ignore letter case and spaces when checking. If they are not anagrams, return false. Example:
//  Input: "listen", "silent" → Output: true Input: "hello", "world" → Output: false

function isAnagram(str1, str2) {
  const clean = s => s.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
  return clean(str1) === clean(str2);
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("Listen", "Silent"));
console.log(isAnagram("A gentleman", "Elegant man"));
console.log(isAnagram("hello", "world"));
console.log(isAnagram("rat", "car"));