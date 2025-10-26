// Task:
// Flatten One Level Write flatten(arr) that takes an array of arrays and flattens it one level deep
// ,The deep of flatten is unknown Example: [[1, 2], [3, 4], [5]] → [1, 2, 3, 4, 5]. Write two function.
// one using .flat() (but dont provide number to flat fn) And another fn without using extra helper function

// with flat() method
function flatten(arr) {
  if (!Array.isArray(arr)) throw new Error("You must use an array!");
  return arr.flat(Infinity);
}

// with recursion
function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("You must use an array!");
  }

  const final = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const flattened = flatten(arr[i]);
      for (let j = 0; j < flattened.length; j++) {
        final.push(flattened[j]);
      }
    } else {
      final.push(arr[i]);
    }
  }

  return final;
}

console.log(flatten([1, [2, [3, [4, [5]]]]]));
console.log(flatten([[1], [[2, [3]]], 4]));
console.log(flatten([]));
console.log(flatten([1, [2], 3]));
