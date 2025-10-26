// Task:
// Maximum and Minimum Create two functions
// maxInArray(arr) → returns the largest number.
// minInArray(arr) → returns the smallest number. Do not use Math.max(...arr) or Math.min(...arr) — implement manually.

function maxInArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("You should use array for this function!");
    }
    if (arr.length === 0) {
        throw new Error("Array shouldn't be empty!");
    }

    let max = arr[0];
    arr.forEach((el) => {
        if (typeof el !== "number" || Number.isNaN(el)) {
            throw new Error("array must contain only numbers!");
        } else {
            if (el > max) {
                max = el;
            }
        }
    });
    return max;
}

console.log(maxInArray([1, 9, 3, 4]));
