function addAsync(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a === "number" && typeof b === "number") resolve(a + b);
    else reject("NOT_NUMBER");
  });
}

addAsync(3, 4).then(console.log).catch(console.error);
addAsync(3, "x").then(console.log).catch(console.error);
