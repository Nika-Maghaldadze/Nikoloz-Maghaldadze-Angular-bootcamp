// Task 1:
// Even or Odd & Voting Eligibility
// Even or Odd Write a function named checkEvenOrOdd. It must take one parameter named number. If number is even → return "Even". If number is odd → return "Odd".
// Voting Eligibility Write a function named checkVotingEligibility. It must take one parameter named age.
// If age is less than 18 → return "Too young to vote"
// If age is between 18 and 65 (inclusive) → return "Eligible to vote"
// Otherwise → return "Eligible for senior voting benefits"

// =========================================================================
// 1)
function checkEvenOrOdd(number){
    if(number % 2 == 0){
        return "Even"
    }else{
        return "Odd"
    }
}
// 2)
function checkVotingEligibility(age){
    if(age < 18){
        return "Too young to vote"
    }else if(age >= 18 || age <= 65){
        return "Eligible to vote"
    }else{
        return "Eligible for senior voting benefits"
    }
}
