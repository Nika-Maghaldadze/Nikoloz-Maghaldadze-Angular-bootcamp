// Task:
// Reverse Without Built-in Write reverseArray(arr) that returns a new array with elements reversed. Example: [1, 2, 3] → [3, 2, 1]. Do not use .reverse().

function reverseArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array!");
    }

    if(arr.length === 0){
        throw new Error("Array is empty!");
    }

    let newArr = [];

    for(let i = arr.length - 1; i >= 0; i--){
        newArr.push(arr[i]);
    }

    return newArr;
}

console.log(reverseArray([1,2,3,4,5]));
