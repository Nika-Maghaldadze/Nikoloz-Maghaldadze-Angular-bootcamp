async function runQueue(tasks, delay) {
  if (!Array.isArray(tasks)) throw new Error("INVALID_TASKS");
  const results = [];
  for (const task of tasks) {
    const res = await task();
    results.push(res);
    await new Promise(r => setTimeout(r, delay));
  }
  return results;
}

const tasks = [
  async () => "Task 1 done",
  async () => "Task 2 done",
  async () => "Task 3 done",
];

runQueue(tasks, 300).then(console.log);
