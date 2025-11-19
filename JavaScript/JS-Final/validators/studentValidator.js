export function validateStudent(input = {}) {
    const errors = [];
    const value = {};

    const sanitizeName = (s) => String(s).trim().replace(/\s+/g, " ");

    if (!input.firstName || !String(input.firstName).trim()) {
        errors.push({ field: "firstName", message: "required" });
    } else value.firstName = sanitizeName(input.firstName);

    if (!input.lastName || !String(input.lastName).trim()) {
        errors.push({ field: "lastName", message: "required" });
    } else value.lastName = sanitizeName(input.lastName);

    if (!input.gradeLevel || !String(input.gradeLevel).trim()) {
        errors.push({ field: "gradeLevel", message: "required" });
    } else value.gradeLevel = String(input.gradeLevel).trim();

    if (input.meta) {
        value.meta = {};

        if (input.meta.guardianName)
            value.meta.guardianName = String(input.meta.guardianName).trim();

        if (input.meta.email) {
            const e = String(input.meta.email);
            const atCount = (e.match(/@/g) || []).length;

            if (e.startsWith("@") || e.endsWith("@") || atCount !== 1) {
                errors.push({
                    field: "meta.email",
                    message:
                        "invalid email (must contain exactly one @ and not start/end with @)",
                });
            } else value.meta.email = e;
        }
    }

    return { ok: errors.length === 0, errors, value };
}
