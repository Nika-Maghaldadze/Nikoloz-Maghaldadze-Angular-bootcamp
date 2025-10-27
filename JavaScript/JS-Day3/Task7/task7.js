// Task:
// .Intersection of Two Arrays Write a function intersection(arr1, arr2) that returns a new array containing elements present in both arrays.
// Example: [1, 2, 3, 4] and [3, 4, 5, 6] → [3, 4].

function intersection(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error("Both must be array!");
    }
    return arr1.filter((value, index) => 
        arr2.includes(value) && arr1.indexOf(value) === index
    );
}

console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6])); 