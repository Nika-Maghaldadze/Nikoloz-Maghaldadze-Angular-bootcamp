let NOW = new Date().toISOString();

export function getNow() {
    return NOW;
}

export function setNow(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) throw new Error("Invalid ISO datetime for NOW()");
    NOW = d.toISOString();
}
