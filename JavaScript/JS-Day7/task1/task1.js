function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Waited ${ms} ms`), ms);
  });
}

wait(500).then(console.log);
