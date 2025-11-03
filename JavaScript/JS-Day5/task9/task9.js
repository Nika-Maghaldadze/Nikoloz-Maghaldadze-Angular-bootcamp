'use strict'
// 9.Conditional Spread
// Given const premium = true; const user = { name: "Ana" }.
// Create a new object:
// Always has name.
// If premium is true, also include { role: "premium" } using spread.

const premium = true;
const user = {
    name: "Ana", ...(premium ? { role: "premium" } : {})
};
console.log(user);