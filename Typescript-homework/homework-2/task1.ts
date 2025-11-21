function compare<T>(a: T, b: T, descending: boolean): number {
    if (a === b) {
        return 0;
    }
    if (!descending) {
        return a > b ? 1 : -1;
    } else {
        return a < b ? 1 : -1;
    }
}

function sortBy<T, K extends keyof T>(
    items: T[],
    key: K,
    descending: boolean = false
): T[] {
    const copy = [...items];
    copy.sort((a, b) => {
        return compare(a[key], b[key], descending);
    });
    return copy;
}
