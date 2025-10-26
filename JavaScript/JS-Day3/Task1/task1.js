// Task:
// Sum of Elements Write a function sumArray(arr) that returns the sum of all numbers in the array. Example: [1, 2, 3, 4] → 10.

function sumArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array!");
    }
    if (arr.length === 0) {
        throw new Error("You have to fill array with numbers!");
    }
    arr.forEach((element) => {
        if (typeof element !== "number") {
            throw new Error("Array must have only numbers!");
        }
        if (Number.isNaN(element)) {
            throw new Error("you can't use NaN!");
        }
    });
    return arr.reduce((sum, number) => sum + number, 0);
}

console.log(sumArray([1, 2, 3, 4]));
console.log(sumArray([])); // Error: You have to fill array with numbers!
console.log(sumArray(1)); // Error: Input must be an array!
console.log(sumArray([1, 2, 3, 4, "nikoloza"])); // Error: Array must have only numbers!
console.log(sumArray([1, 2, 3, 4, NaN])); // Error: you can't use NaN!
