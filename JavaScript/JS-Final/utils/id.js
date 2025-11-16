let counter = 1;

export function generateId(prefix = "id") {
    if (typeof prefix !== "string") prefix = "id";
    const id = `${prefix}_${counter}`;
    counter += 1;
    return id;
}
