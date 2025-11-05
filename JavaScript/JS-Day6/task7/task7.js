class Flight {
  #code;
  #seats;
  #booked = new Set();

  constructor(code, seats) {
    if (typeof code !== "string" || !code.trim() || !Number.isInteger(seats) || seats < 1)
      throw new Error("INVALID_FLIGHT");
    this.#code = code;
    this.#seats = seats;
  }

  book(name) {
    if (this.#booked.size >= this.#seats) throw new Error("FULL");
    if (this.#booked.has(name)) throw new Error("DUPLICATE");
    this.#booked.add(name);
  }

  cancel(name) {
    if (!this.#booked.delete(name)) throw new Error("NOT_FOUND");
  }

  list() { return [...this.#booked]; }
  available() { return this.#seats - this.#booked.size; }
}
