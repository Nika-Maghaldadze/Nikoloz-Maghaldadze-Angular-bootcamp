export class Account {
  readonly id: string;
  protected _balance = 0;

  constructor(id: string) { this.id = id; }

  balance() { return this._balance; }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit amount must be > 0");
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdraw amount must be > 0");
    if (amount > this._balance) throw new Error("amount exceeds balance");
    this._balance -= amount;
  }
}

export class SavingsAccount extends Account {
  private minBalance: number;
  constructor(id: string, minBalance: number) {
    super(id);
    this.minBalance = minBalance;
  }

  override withdraw(amount: number): void {
    if (this._balance - amount < this.minBalance) {
      throw new Error("Min balance");
    }
    super.withdraw(amount);
  }
}

export function usecase_task7() {
  const acc = new SavingsAccount("S1", 50);
  acc.deposit(100);
  acc.withdraw(30);
  console.log(acc.balance());
}