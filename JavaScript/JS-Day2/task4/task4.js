// Task:
// Step Transformer (Function-as-Rule)
// Implement transform(n, steps, ruleFn, done):
// Starting from number n, apply ruleFn steps times. Each application transforms the number into a new number.
// When finished, call done(true, finalNumber).
// If steps < 0, call done(false, "invalid").
// ruleFn is a single function you pass in tests (e.g., x => x * 2 + 1), but do not store it in objects/arrays.

function transform(n, steps, ruleFn, done) {
  if (steps < 0) {
    done(false, "invalid");
    return;
  }

  let num = n;

  for (let i = 0; i < steps; i++) {
    num = ruleFn(num);
  }

  done(true, num);
}

function rule(x) {
  return x * 2 + 1;
}

function done(success, result) {
  if (success) {
    console.log("Final result:", result);
  } else {
    console.log("Error:", result);
  }
}

transform(3, 4, rule, done);
