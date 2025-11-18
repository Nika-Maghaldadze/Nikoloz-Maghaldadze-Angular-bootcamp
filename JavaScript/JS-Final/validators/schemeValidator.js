export function validateScheme({ breakpoints }) {
    const errors = [];

    if (!Array.isArray(breakpoints) || breakpoints.length === 0)
        errors.push("breakpoints required");

    for (let i = 0; i < breakpoints.length; i++) {
        const b = breakpoints[i];
        if (
            typeof b.minPercent !== "number" ||
            b.minPercent < 0 ||
            b.minPercent > 100
        ) {
            errors.push("minPercent out of range");
        }

        if (typeof b.gpaPoints !== "number" || b.gpaPoints < 0) {
            errors.push("gpaPoints must be >= 0");
        }

        if (!b.letter) {
            errors.push("letter required");
        }

        if (i === breakpoints.length - 1 && b.minPercent !== 0) {
            errors.push("bottom breakpoint minPercent must be 0");
        }

        if (i > 0 && breakpoints[i - 1].minPercent <= b.minPercent) {
            errors.push(
                "breakpoints must be strictly descending by minPercent"
            );
        }
    }

    const dup = breakpoints
        .map((b) => b.letter)
        .filter((v, i, a) => a.indexOf(v) !== i);

    if (dup.length) {
        errors.push("letters must be unique");
    }

    return { ok: errors.length === 0, errors };
}
