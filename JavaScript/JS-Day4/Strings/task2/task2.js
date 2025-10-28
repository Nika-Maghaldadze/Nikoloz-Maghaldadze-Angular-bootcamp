// Task:
// Palindrome Checker
// Write a function named isPalindrome. It must take one parameter named str (a string).
// The function must return true if str reads the same forward and backward.
// Ignore spaces and letter case when checking.
// Examples:
// Input: "anna" → Output: true
// Input: "A man a plan a canal Panama" → Output: true
// Input: "hello" → Output: false


function isPalindrome(str){
    if(typeof str !== 'string'){
        throw new Error("input must be type of string!");
    }
    if(str.length === 0){
        throw new Error("Please enter string");
    }

    //remove empty spaces and change uppercase with lowercase
    let cleanStr = '';

    for (let j = 0; j < str.length; j++) {
        const char = str[j].toLowerCase();
        if (char !== ' ') cleanStr += char;
    }

    // reverse clean string
    let reversed = '';
    for(let i = cleanStr.length -1; i >= 0; i--){
        reversed += cleanStr[i];
    }
    
    return cleanStr === reversed;
}


console.log(isPalindrome("anna"));
console.log(isPalindrome("A man a plan a canal Panama"));
console.log(isPalindrome("hello"));