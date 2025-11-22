function mergeByKey<
  T,
  U,
  K1 extends keyof T,
  K2 extends keyof U,
  V extends T[K1] & U[K2]
>(
  left: T[],
  right: U[],
  keyLeft: K1,
  keyRight: K2
): Array<[T, U]> {
  const result: Array<[T, U]> = [];

  for (const leftItem of left) {
    const leftValue = leftItem[keyLeft] as V;

    for (const rightItem of right) {
      const rightValue = rightItem[keyRight] as V;

      if (leftValue === rightValue) {
        result.push([leftItem, rightItem]);
      }
    }
  }

  return result;
}
