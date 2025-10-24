// Task:
// Greeter with Punctuation Implement greet(name = "Guest", punct = "!") → returns "Hello, <name><punct>".
// Show that greet(undefined, "?") → "Hello, Guest?" and greet("", "!") → "Hello, !" (default only on undefined, not other falsy).

function greet(name = "Guest", punct = "!") {
  return `Hello, ${name}${punct}`;
}

console.log(greet("Nika", "!"));
console.log(greet(undefined, "?"));
console.log(greet("", "!"));
