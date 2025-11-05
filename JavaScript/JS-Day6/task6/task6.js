class ParkingLot {
  #capacity; #cars;
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) throw new Error("INVALID_CAPACITY");
    this.#capacity = capacity;
    this.#cars = [];
  }
  park(plate) {
    if (this.isFull()) throw new Error("FULL");
    if (this.#cars.includes(plate)) throw new Error("DUPLICATE");
    this.#cars.push(plate);
  }
  leave(plate) {
    const idx = this.#cars.indexOf(plate);
    if (idx < 0) throw new Error("NOT_FOUND");
    this.#cars.splice(idx, 1);
  }
  isFull() { return this.#cars.length >= this.#capacity; }
  count() { return this.#cars.length; }
}

const lot = new ParkingLot(2);
lot.park("AAA111");
lot.park("BBB222");
console.log("Lot full:", lot.isFull());