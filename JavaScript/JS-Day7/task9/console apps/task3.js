import readline from "readline";

const app = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.question("Choose conversion type (C→F or F→C): ", (type) => {
  if (type.toUpperCase() === "C→F" || type.toUpperCase() === "C->F") {
    app.question("Enter temperature in Celsius: ", (c) => {
      const f = (parseFloat(c) * 1.8 + 32).toFixed(2);
      console.log(`${c}°C is equal to ${f}°F`);
      app.close();
    });
  } else if (type.toUpperCase() === "F→C" || type.toUpperCase() === "F->C") {
    app.question("Enter temperature in Fahrenheit: ", (f) => {
      const c = ((parseFloat(f) - 32) / 1.8).toFixed(2);
      console.log(`${f}°F is equal to ${c}°C`);
      app.close();
    });
  } else {
    console.log("Invalid conversion type. Use 'C→F' or 'F→C'.");
    app.close();
  }
});
