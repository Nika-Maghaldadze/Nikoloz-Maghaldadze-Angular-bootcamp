// Task:
// Temperature Converter Create two arrow functions:
// toCelsius(f) → converts Fahrenheit to Celsius.
// toFahrenheit(c) → converts Celsius to Fahrenheit.

const toCelsius = (f) => (f - 32) * 5 / 9;

const toFahrenheit = (c) => (c * 9 / 5) + 32;

console.log(toCelsius(212));
console.log(toCelsius(32));
console.log(toFahrenheit(0));
console.log(toFahrenheit(100));
