class ParkingLot {
  #capacity;
  #cars = new Set();

  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1)
      throw new Error("INVALID_CAPACITY");
    this.#capacity = capacity;
  }

  park(plate) {
    if (this.#cars.size >= this.#capacity) throw new Error("FULL");
    if (this.#cars.has(plate)) throw new Error("DUPLICATE");
    this.#cars.add(plate);
  }

  leave(plate) {
    if (!this.#cars.delete(plate)) throw new Error("NOT_FOUND");
  }

  isFull() { return this.#cars.size >= this.#capacity; }
  count() { return this.#cars.size; }
}
