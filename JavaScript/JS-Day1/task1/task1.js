// Task 1:
// Even or Odd & Voting Eligibility
// Even or Odd Write a function named checkEvenOrOdd. It must take one parameter named number. If number is even → return "Even". If number is odd → return "Odd".
// Voting Eligibility Write a function named checkVotingEligibility. It must take one parameter named age.
// If age is less than 18 → return "Too young to vote"
// If age is between 18 and 65 (inclusive) → return "Eligible to vote"
// Otherwise → return "Eligible for senior voting benefits"

// =========================================================================
// 1)
function checkEvenOrOdd(number) {
    if (number % 2 == 0) {
        return "Even";
    } else {
        return "Odd";
    }
}
// 2)
function checkVotingEligibility(age) {
    if (age < 18) {
        return "Too young to vote";
    } else if (age >= 18 && age <= 65) {
        return "Eligible to vote";
    } else {
        return "Eligible for senior voting benefits";
    }
}

// Task 2:
// Grade Checker
// Write a function named getGrade. It must take one parameter named score.
// If score is between 90 and 100 → return "A"
// If score is between 75 and 89 → return "B"
// If score is between 50 and 74 → return "C"
// If score is below 50 → return "Fail"

function getGrade(score) {
    if (score >= 90 && score <= 100) {
        return "A";
    } else if (score >= 75 && score < 90) {
        return "B";
    } else if (score >= 50 && score < 75) {
        return "C";
    } else {
        return "Fail";
    }
}

// Task 3:
// Discount Calculator
// Write a function named calculateDiscount. It must take one parameter named totalAmount.
// If totalAmount is less than 50 → return "No discount"
// If totalAmount is between 50 and 100 (inclusive) → return "10% discount"
// If totalAmount is greater than 100 → return "20% discount"

function calculateDiscount(totalAmount) {
    if (totalAmount < 50) {
        return "No discount";
    } else if (totalAmount >= 50 && totalAmount <= 100) {
        return "10% discount";
    } else {
        return "20% discount";
    }
}
