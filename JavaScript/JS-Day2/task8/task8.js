// Task:
// once
// Implement once(fn) that returns a new function which calls fn only the first time and returns the cached result thereafter.
// Demonstrate with a function that logs when it runs.

function once(fn) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            result = fn(...args);
            called = true;
        }
        return result;
    };
}

function sayHello(name) {
    console.log("Function working...");
    return `Hello, ${name}!`;
}

const greetOnce = once(sayHello);

console.log(greetOnce("Nika"));
console.log(greetOnce("Luka"));
console.log(greetOnce("Anna"));
