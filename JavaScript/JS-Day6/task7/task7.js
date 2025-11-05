class Flight {
  #code; #seats; #booked;
  constructor(code, seats) {
    if (!code || typeof code !== "string" || !Number.isInteger(seats) || seats <= 0)
      throw new Error("INVALID_FLIGHT");
    this.#code = code;
    this.#seats = seats;
    this.#booked = [];
  }
  book(name) {
    if (this.#booked.length >= this.#seats) throw new Error("FULL");
    if (this.#booked.includes(name)) throw new Error("DUPLICATE");
    this.#booked.push(name);
  }
  cancel(name) {
    const idx = this.#booked.indexOf(name);
    if (idx < 0) throw new Error("NOT_FOUND");
    this.#booked.splice(idx, 1);
  }
  list() { return [...this.#booked]; }
  available() { return this.#seats - this.#booked.length; }
}


const flight = new Flight("TBS123", 2);
flight.book("Ana");
flight.book("Luka");
console.log("Flight Available:", flight.available());