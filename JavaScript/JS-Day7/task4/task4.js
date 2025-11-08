function summarize(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new Error("INVALID_INPUT"));

    Promise.allSettled(promises).then(results => {
      const summary = {
        total: results.length,
        fulfilled: results.filter(r => r.status === "fulfilled").length,
        rejected: results.filter(r => r.status === "rejected").length,
        values: results.filter(r => r.status === "fulfilled").map(r => r.value),
        reasons: results.filter(r => r.status === "rejected").map(r => r.reason),
      };
      resolve(summary);
    });
  });
}

const promises = [
  Promise.resolve(10),
  Promise.reject("ERR"),
  Promise.resolve(20),
];
summarize(promises).then(console.log);
