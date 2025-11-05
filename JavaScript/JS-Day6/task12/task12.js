function Dog(name) {
  this.name = name;
  this.tricks = [];
}
Dog.prototype.learn = function (trick) {
  this.tricks.push(trick);
};

const rex = new Dog("Rex");
const max = new Dog("Max");
rex.learn("sit");
rex.learn("roll");
console.log("Dog Fix:", rex.tricks, max.tricks);