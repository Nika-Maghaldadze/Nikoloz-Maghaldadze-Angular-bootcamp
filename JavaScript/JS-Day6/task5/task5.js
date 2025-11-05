class ATM {
  #cash;
  constructor(initialCash) {
    if (!Number.isInteger(initialCash) || initialCash < 0) throw new Error("INVALID_AMOUNT");
    this.#cash = initialCash;
  }
  deposit(amount) {
    if (!Number.isInteger(amount) || amount <= 0) throw new Error("INVALID_AMOUNT");
    this.#cash += amount;
    return this.#cash;
  }
  withdraw(amount) {
    if (!Number.isInteger(amount) || amount <= 0) throw new Error("INVALID_AMOUNT");
    if (amount > this.#cash) throw new Error("ATM_EMPTY");
    this.#cash -= amount;
    return this.#cash;
  }
  balance() { return this.#cash; }
}

const atm = new ATM(10000);
atm.deposit(5000);
atm.withdraw(2000);
console.log("ATM Balance:", atm.balance());