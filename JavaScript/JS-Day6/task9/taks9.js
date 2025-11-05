class SimpleBankAccount {
  #balance = 0;
  deposit(amount) {
    if (amount <= 0) throw new Error("INVALID_AMOUNT");
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount <= 0) throw new Error("INVALID_AMOUNT");
    if (this.#balance < amount) throw new Error("INSUFFICIENT_FUNDS");
    this.#balance -= amount;
  }
  getBalance() { return this.#balance; }
}

const book = new EncapsulatedBankAccount();
book.deposit(500);
book.withdraw(100);
console.log("Encapsulated Balance:", book.getBalance());