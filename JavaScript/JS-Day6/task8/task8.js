class Password {
  #value;
  constructor(value) {
    if (typeof value !== "string") throw new Error("INVALID_PASSWORD");
    this.#value = value;
  }
  isValid() {
    const v = this.#value;
    return v.length >= 8 &&
      /[A-Z]/.test(v) && /[a-z]/.test(v) &&
      /\d/.test(v) && /[!@#$%^&*]/.test(v);
  }
  mask() { return "*".repeat(this.#value.length); }
}

const pass = new Password("Abc!2345");
console.log("Password Valid:", pass.isValid(), "Mask:", pass.mask());