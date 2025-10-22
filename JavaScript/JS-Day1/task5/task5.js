// Task 1:
// Number Guessing Game
// Write a function named playGuessingGame. It must generate a random number between 1 and 20 and store it in a variable named secretNumber. Then repeatedly ask the user to guess the number until they are correct.
// If the guess is greater than secretNumber → print "Too high"
// If the guess is less than secretNumber → print "Too low"
// If the guess equals secretNumber → print "Correct! You win." and stop the game.

function playGuessingGame(){
    let secretNumber = Math.floor(Math.random() * 20) + 1;
    let isCorrect = false;
    while(!isCorrect){
        let guess = Number(prompt("Enter a number between 1 and 20:"));
        if(guess > secretNumber){
            console.log("Too high");
        }else if(guess < secretNumber){
            console.log("Too low");
        }else if (guess === secretNumber){
            console.log("Correct! You win");
            isCorrect = true;
        }else{
            console.log("incorrect value! please enter number");
        }
    }
}

// Task 2:
// Reverse Digits
// Write a function named reverseDigits. It must take one parameter named number. Use a while loop to reverse the digits of number. Return the reversed number.
// Example:
// Input: 1234 → Output: 4321

function reverseDigits(number) {
  let reversed = 0;

  while (number > 0) {
    let digit = number % 10;
    reversed = reversed * 10 + digit;
    number = Math.floor(number / 10);
  }

  return reversed;
}