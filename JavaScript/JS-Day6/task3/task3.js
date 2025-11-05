class Employee {
  #name;
  #monthlyGross;

  constructor(name, monthlyGross) {
    if (typeof name !== "string" || !name.trim() || !Number.isFinite(monthlyGross) || monthlyGross <= 0)
      throw new Error("INVALID_EMPLOYEE");
    this.#name = name;
    this.#monthlyGross = Number(monthlyGross.toFixed(2));
  }

  net(taxPct) {
    return Number((this.#monthlyGross * (1 - taxPct / 100)).toFixed(2));
  }

  toString() {
    return `EMP:${this.#name}|GROSS=${this.#monthlyGross.toFixed(2)}`;
  }

  get gross() { return this.#monthlyGross; }
  get name() { return this.#name; }
}

class Manager extends Employee {
  #band;
  constructor(name, monthlyGross, band) {
    super(name, monthlyGross);
    if (!["M1", "M2", "M3"].includes(band))
      throw new Error("INVALID_BAND");
    this.#band = band;
  }

  bonus() {
    const rates = { M1: 0.05, M2: 0.1, M3: 0.15 };
    return Number((this.gross * rates[this.#band]).toFixed(2));
  }

  toString() {
    return `${super.toString()}|BAND=${this.#band}|BONUS=${this.bonus().toFixed(2)}`;
  }
}


const mgr = new Manager("Ana", 4000, "M2");
console.log("Employee:", mgr.toString());