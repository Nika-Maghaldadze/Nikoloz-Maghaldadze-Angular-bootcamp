// Task:
// Normalize Spaces (No split, no regex)
// Implement normalizeSpaces(text) that:
// Trims leading/trailing spaces,
// Replaces any sequence of spaces in the middle with a single space,
// Without using .split, .join, or regex.
// Example: " hello world " → "hello world".

function normalizeSpaces(text) {
  let result = "";
  let inSpace = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === " ") {
      if (!inSpace && result.length > 0) {
        result += " ";
      }
      inSpace = true;
    } else {
      result += char;
      inSpace = false;
    }
  }
  if (result.endsWith(" ")) {
    result = result.slice(0, -1);
  }
  return result;
}
console.log(`"${normalizeSpaces("  hello   world  ")}"`);
