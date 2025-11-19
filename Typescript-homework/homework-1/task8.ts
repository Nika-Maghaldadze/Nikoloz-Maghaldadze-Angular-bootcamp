export function clamp(n: number, min: number, max: number): number {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

export function groupBy<T, K extends string | number>(
    arr: T[],
    fn: (item: T) => K
): Record<K, T[]> {
    const out = {} as Record<K, T[]>;
    for (const item of arr) {
        const key = fn(item);
        if (!out[key]) out[key] = [];
        out[key].push(item);
    }
    return out;
}

export function deepFreeze<T>(obj: T): T {
    const seen = new WeakSet<object>();

    const freezeRec = (value: any): void => {
        if (value === null || typeof value !== "object") return;
        if (seen.has(value)) return;
        seen.add(value);

        for (const key of Reflect.ownKeys(value)) {
            freezeRec((value as any)[key]);
        }
        Object.freeze(value);
    };

    freezeRec(obj);
    return obj;
}

export function usecase_task8() {
    console.log(clamp(5, 1, 10));
    console.log(clamp(-3, 0, 100));

    const group = groupBy(
        [
            { name: "Elene", role: "admin" },
            { name: "Nika", role: "user" },
            { name: "Giorgi", role: "admin" },
        ],
        (p) => p.role
    );
    console.log(group);

    const cyc: any = { a: 1 };
    cyc.self = cyc;
    deepFreeze(cyc);
    cyc.a = 999;
    console.log(cyc.a);
}
