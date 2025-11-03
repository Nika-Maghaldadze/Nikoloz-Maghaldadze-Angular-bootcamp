'use strict'
// :1.Create a Simple Object
// Create an object car with properties: brand, model, year.
// Add a method info() that uses this to return a string like:
// "Toyota Corolla (2020)".

const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  info() {
    return `${this.brand} ${this.model} (${this.year})`;
  },
};
console.log(car.info());