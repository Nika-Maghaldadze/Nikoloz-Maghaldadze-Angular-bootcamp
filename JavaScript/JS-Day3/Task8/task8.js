// Task:
// Move Zeroes to End Write a function moveZeroes(arr) that moves all zeroes to the end of the array but keeps the order of other numbers.
// Example: [0, 1, 0, 3, 12] → [1, 3, 12, 0, 0].

function moveZeroes(arr) {
    if (!Array.isArray(arr)) throw new Error("Input must be an array!");

    let position = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            [arr[position], arr[i]] = [arr[i], arr[position]];
            position++;
        }
    }

    return arr;
}
