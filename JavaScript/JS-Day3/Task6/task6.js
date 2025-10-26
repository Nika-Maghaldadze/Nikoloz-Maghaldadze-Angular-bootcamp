// Task:
// Rotate Array Write a function rotate(arr, k) that rotates the array to the right by k steps.
//  Example: [1, 2, 3, 4, 5], k = 2 → [4, 5, 1, 2, 3].

function rotate(arr, k){
    if (!Array.isArray(arr)){
        throw new Error("Input must be an array!");
    }
    if (arr.length === 0){
        return [];
    }
    if (typeof k !== "number" || Number.isNaN(k)){
        throw new Error("k must be a valid number!");
    }

    k = k % arr.length;
    if (k < 0){
        k = arr.length + k;
    }

    for (let step = 0; step < k; step++) {
        const last = arr[arr.length - 1];

        for (let i = arr.length - 1; i > 0; i--) {
            arr[i] = arr[i - 1];
        }

        arr[0] = last;
    }

    return arr;
}


