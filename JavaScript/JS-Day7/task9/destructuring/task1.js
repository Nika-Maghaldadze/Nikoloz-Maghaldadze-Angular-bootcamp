function greet({ name = "Guest", lang = "en" } = {}) {
  if (lang === "fr") return `Bonjour, ${name}`;
  return `Hello, ${name}`;
}

console.log(greet({ name: "Ana", lang: "en" }));
console.log(greet({ name: "Luc", lang: "fr" }));
console.log(greet({}));
console.log(greet());
