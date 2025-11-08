function double(x) {
  return new Promise(resolve => setTimeout(() => resolve(x * 2), 200));
}

function subtract(x) {
  return new Promise(resolve => setTimeout(() => resolve(x - 3), 200));
}

function multiply(x) {
  return new Promise(resolve => setTimeout(() => resolve(x * 5), 200));
}

async function processNumber(x) {
  let result = await double(x);
  result = await subtract(result);
  result = await multiply(result);
  return result;
}

processNumber(5).then(console.log); // → ((5*2)-3)*5 = 35
