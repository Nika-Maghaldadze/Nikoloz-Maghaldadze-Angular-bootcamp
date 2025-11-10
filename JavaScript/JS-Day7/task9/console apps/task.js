import readline from "readline";

const calc = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

calc.question("Enter first number: ", (num1) => {
  calc.question("Enter second number: ", (num2) => {
    calc.question("Choose operation (+, -, *, /): ", (op) => {
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let result;

      switch (op) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": 
          result = b !== 0 ? a / b : "Error: Division by zero";
          break;
        default:
          result = "Invalid operation";
      }

      console.log(`Result: ${result}`);
      calc.close();
    });
  });
});
