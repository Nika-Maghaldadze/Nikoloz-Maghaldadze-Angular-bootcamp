function randomDelay() {
  return Math.floor(Math.random() * 900) + 100;
}

function simulateServer(name) {
  return new Promise(resolve => {
    const delay = randomDelay();
    setTimeout(() => resolve(`${name} OK (${delay}ms)`), delay);
  });
}

async function fastestServer() {
  const servers = [
    simulateServer("Server1"),
    simulateServer("Server2"),
    simulateServer("Server3"),
  ];
  const fastest = await Promise.race(servers);
  console.log(`Fastest response: ${fastest}`);
  return fastest;
}

fastestServer();
