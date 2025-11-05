if (!Function.prototype.once) {
    Object.defineProperty(Function.prototype, "once", {
        value: function () {
            let called = false,
                result;
            const original = this;
            return function (...args) {
                if (!called) {
                    called = true;
                    result = original.apply(this, args);
                }
                return result;
            };
        },
        writable: false,
    });
}
function greet(name) {
    console.log("Hello,", name);
    return "Hi " + name;
}
const greetOnce = greet.once();
console.log("once:", greetOnce("Ana"), greetOnce("Luka"));
