async function fetchWithRetry(fn, retries) {
  for (let i = 1; i <= retries; i++) {
    try {
      return await fn();
    } catch {
      if (i === retries) throw `FAILED_AFTER_${retries}_TRIES`;
    }
  }
}

let attempt = 0;
async function unstableFetch() {
  attempt++;
  if (attempt < 3) throw "Network Error";
  return "Success";
}

fetchWithRetry(unstableFetch, 5)
  .then(console.log)
  .catch(console.error);
