'use strict'
// 2.Getter and Setter
// Create an object person with a property firstName and lastName.
// Add a getter fullName that returns "firstName lastName".
// Add a setter fullName that takes a string and updates both firstName and lastName.
// Example: person.fullName = "Jane Doe" should set both names.

const person = {
  firstName: "Nikoloz",
  lastName: "Maghaldadze",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new TypeError("Full name canot be empty and must be a string!");
    }
    const [first, ...rest] = value.trim().split(" ");
    this.firstName = first;
    this.lastName = rest.join(" ") || "";
  },
};
person.fullName = "Nikoloz Maghaldadze";
console.log(person.fullName);