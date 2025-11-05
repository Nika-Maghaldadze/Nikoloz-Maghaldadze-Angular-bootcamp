"use strict";

class BankAccount {
  #balance;
  #transactions;
  constructor(accountNumber, initialBalance = 0) {
    if (typeof accountNumber !== "string" || !accountNumber.trim())
      throw new Error("INVALID_ACCOUNT");
    if (!Number.isFinite(initialBalance) || initialBalance < 0)
      throw new Error("INVALID_AMOUNT");
    this.accountNumber = accountNumber;
    this.#balance = Number(initialBalance.toFixed(2));
    this.#transactions = [];
  }

  #validateAmount(amount) {
    if (!Number.isFinite(amount) || amount < 0.01)
      throw new Error("INVALID_AMOUNT");
  }

  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance = Number((this.#balance + amount).toFixed(2));
    this.#transactions.push(`+${amount.toFixed(2)}`);
    return this.#balance;
  }

  withdraw(amount) {
    this.#validateAmount(amount);
    if (this.#balance < amount) throw new Error("INSUFFICIENT_FUNDS");
    this.#balance = Number((this.#balance - amount).toFixed(2));
    this.#transactions.push(`-${amount.toFixed(2)}`);
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  printStatement() {
    return [...this.#transactions, `BALANCE=${this.#balance.toFixed(2)}`].join("\n");
  }
}

class SavingsAccount extends BankAccount {
  #rate;
  constructor(accountNumber, initialBalance, rate) {
    super(accountNumber, initialBalance);
    if (!Number.isFinite(rate) || rate < 0 || rate > 1)
      throw new Error("INVALID_RATE");
    this.#rate = rate;
  }

  applyMonthlyInterest() {
    const interest = Number(((this.getBalance() * this.#rate) / 12).toFixed(2));
    if (interest > 0) this.deposit(interest);
    return this.getBalance();
  }
}

const s = new SavingsAccount("TBC100", 1000, 0.06);
s.deposit(200);
s.withdraw(100);
s.applyMonthlyInterest();
console.log(" BankAccount:", s.printStatement());
