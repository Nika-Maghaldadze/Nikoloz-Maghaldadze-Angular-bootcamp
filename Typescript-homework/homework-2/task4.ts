class PairZip<A, B> {
  private pairs: [A, B][];

  constructor(pairs: [A, B][]) {
    this.pairs = pairs;
  }

  static fromArrays<A, B>(left: A[], right: B[]): PairZip<A, B> {
    if (left.length !== right.length) {
      throw new Error("Arrays must have the same length");
    }

    const resultPairs: [A, B][] = [];

    for (let i = 0; i < left.length; i++) {
      resultPairs.push([left[i], right[i]]);
    }

    return new PairZip<A, B>(resultPairs);
  }

  mapLeft<A2>(transform: (a: A) => A2): PairZip<A2, B> {
    const newPairs: [A2, B][] = this.pairs.map(([left, right]) => {
      const newLeft = transform(left);
      return [newLeft, right];
    });

    return new PairZip<A2, B>(newPairs);
  }

  mapRight<B2>(transform: (b: B) => B2): PairZip<A, B2> {
    const newPairs: [A, B2][] = this.pairs.map(([left, right]) => {
      const newRight = transform(right);
      return [left, newRight];
    });

    return new PairZip<A, B2>(newPairs);
  }

  unzip(): [A[], B[]] {
    const leftArray: A[] = [];
    const rightArray: B[] = [];

    for (const [left, right] of this.pairs) {
      leftArray.push(left);
      rightArray.push(right);
    }

    return [leftArray, rightArray];
  }
}
