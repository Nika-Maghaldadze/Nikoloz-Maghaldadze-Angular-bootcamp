function parseISO(dateStr) {
    if (typeof dateStr !== "string") return NaN;
    const time = Date.parse(dateStr);
    return isNaN(time) ? NaN : time;
}

export function isValidISO(dateStr) {
    return !isNaN(parseISO(dateStr));
}

export function isDateBefore(a, b) {
    const tA = parseISO(a);
    const tB = parseISO(b);
    if (isNaN(tA) || isNaN(tB)) return false;
    return tA < tB;
}

export function isDateAfter(a, b) {
    const tA = parseISO(a);
    const tB = parseISO(b);
    if (isNaN(tA) || isNaN(tB)) return false;
    return tA > tB;
}

export function todayISO() {
    return new Date().toISOString();
}
