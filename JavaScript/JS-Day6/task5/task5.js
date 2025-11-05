class ATM {
  #cash;
  constructor(initialCash) {
    if (!Number.isInteger(initialCash) || initialCash < 0)
      throw new Error("INVALID_AMOUNT");
    this.#cash = initialCash;
  }

  deposit(amount) {
    if (!Number.isInteger(amount) || amount < 0) throw new Error("INVALID_AMOUNT");
    return (this.#cash += amount);
  }

  withdraw(amount) {
    if (!Number.isInteger(amount) || amount < 0) throw new Error("INVALID_AMOUNT");
    if (this.#cash < amount) throw new Error("ATM_EMPTY");
    return (this.#cash -= amount);
  }

  balance() {
    return this.#cash;
  }
}
