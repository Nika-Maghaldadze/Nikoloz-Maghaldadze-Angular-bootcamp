import readline from "readline";

const guess = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const randomNum = Math.floor(Math.random() * 10) + 1;

function askGuess() {
  guess.question("Guess the number (1-10): ", (answer) => {
    const guess = parseInt(answer);
    if (guess > randomNum) {
      console.log("Too high! Try again.");
      askGuess();
    } else if (guess < randomNum) {
      console.log("Too low! Try again.");
      askGuess();
    } else {
      console.log(`Correct! The number was ${randomNum}`);
      guess.close();
    }
  });
}

askGuess();
