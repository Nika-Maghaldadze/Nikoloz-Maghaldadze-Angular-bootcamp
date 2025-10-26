// Task:
// 1.Unique Elements Write a function unique(arr) that removes duplicates and returns a new array with only unique values. Example: [1, 2, 2, 3, 1] → [1, 2, 3]. (Don’t use any methods — solve manually.)
// arr.splice(1, 1); // remove 1 element at index 1

function unique(arr){

    if(!Array.isArray(arr)){
        throw new Error("Use only array!");
    }

    if(arr.length === 0){
        // throw new Error("Array is Empty!");
        // აქ შემეძლო ერორის გასროლაც მარა ცარიელი მასივის დაბრუნება უფრო სწორი მგონია
        return []
    }

    let final = [];

    for(let i = 0; i < arr.length; i++){
        let isDuplicate = false;
        for (let j = 0; j < final.length; j++) {
            if (arr[i] === final[j] || (Number.isNaN(arr[i]) && Number.isNaN(final[j]))) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            final.push(arr[i]);
        }
    }
    return final;
}

console.log(unique([1,1,1,2,2,2,3,3,3,4,4,4]));
console.log(unique([1, 2, 2, 3, 1]));
console.log(unique([5, 5, 5, 5]));
console.log(unique([10, 20, 10, 30, 20]));
console.log(unique([]));
console.log(unique([1]));
console.log(unique([NaN, NaN, 1, 2]));
console.log(unique([0, -0, 0]));
console.log(unique(123));
console.log(unique("abc"));
console.log(unique([1, 2, "2", 2])); // აქ სტრინგებზეც ავამუშავე და ტიპები არ გავფილტრე მაინც
