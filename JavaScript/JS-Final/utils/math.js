export function round(value, decimals = 2) {
    if (typeof value !== "number" || isNaN(value)) return 0;
    if (typeof decimals !== "number" || decimals < 0) decimals = 2;
    return Number(value.toFixed(decimals));
}

export function average(list) {
    if (!Array.isArray(list) || !list.length) return 0;

    let sum = 0;
    let count = 0;

    for (const x of list) {
        if (typeof x === "number" && !isNaN(x)) {
            sum += x;
            count++;
        }
    }

    return count === 0 ? 0 : sum / count;
}

export function stddevPopulation(list) {
    if (!Array.isArray(list) || !list.length) return 0;

    const nums = list.filter((x) => typeof x === "number" && !isNaN(x));
    if (!nums.length) return 0;

    const avg = average(nums);

    let sumSq = 0;
    for (const x of nums) {
        const diff = x - avg;
        sumSq += diff * diff;
    }

    const variance = sumSq / nums.length;
    return Math.sqrt(variance);
}
