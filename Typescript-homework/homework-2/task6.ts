function uniqueByKey<T, K extends keyof T>(items: T[], key: K): T[] {
  const seenValues = new Set<unknown>();
  const result: T[] = [];

  for (const item of items) {
    const value = item[key];

    if (!seenValues.has(value)) {
      seenValues.add(value);
      result.push(item);
    }
  }

  return result;
}
