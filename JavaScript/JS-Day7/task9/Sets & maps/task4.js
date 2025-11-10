function invertMap(m) {
  const inverted = new Map();

  for (const [key, value] of m) {
    if (inverted.has(value)) throw "DUPLICATE_VALUE";
    inverted.set(value, key);
  }

  return inverted;
}

const m1 = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log(invertMap(m1));

const m2 = new Map([
  ["a", 1],
  ["b", 1],
]);
try {
  console.log(invertMap(m2));
} catch (e) {
  console.log(e);
}
