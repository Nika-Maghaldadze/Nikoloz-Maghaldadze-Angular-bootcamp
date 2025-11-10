export function toUpper(text) {
  return text.toUpperCase();
}

export function toLower(text) {
  return text.toLowerCase();
}

export default function reverse(text) {
  return text.split("").reverse().join("");
}