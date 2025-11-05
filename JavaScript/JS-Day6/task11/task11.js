class Vehicle {
  constructor(make, model) {
    if (!make || !model) throw new Error("INVALID_VEHICLE");
    this.make = make;
    this.model = model;
  }
  getDetails() {
    return `Vehicle: ${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model);
    this.doors = doors;
  }
  getDetails() {
    return `Car: ${this.make} ${this.model} | Doors: ${this.doors}`;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payloadCapacity) {
    super(make, model);
    this.payloadCapacity = payloadCapacity;
  }
  getDetails() {
    return `Truck: ${this.make} ${this.model} | Payload: ${this.payloadCapacity}kg`;
  }
}

console.log("Car:", new Car("Toyota", "Corolla", 4).getDetails());