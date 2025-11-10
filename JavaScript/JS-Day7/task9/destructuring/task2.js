function sumAll(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3, 4));
console.log(sumAll(10, 20));
console.log(sumAll());
