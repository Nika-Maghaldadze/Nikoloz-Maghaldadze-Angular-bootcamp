import { db } from "../repositories/baseRepository.js";

export function validateSubjectInput(input, { existingId = null } = {}) {
    const errors = [];
    const value = {};

    if (!input.code || !/^[A-Z0-9-]+$/.test(input.code)) {
        errors.push({
            field: "code",
            message: "invalid format (UPPER letters, numbers, hyphen allowed)",
        });
    } else {
        value.code = input.code;
    }

    if (!Number.isInteger(input.creditHours) || input.creditHours < 1) {
        errors.push({ field: "creditHours", message: "must be integer >= 1" });
    } else {
        value.creditHours = input.creditHours;
    }

    if (!["graded", "passfail"].includes(input.mode)) {
        errors.push({
            field: "mode",
            message: 'must be "graded" or "passfail"',
        });
    } else {
        value.mode = input.mode;
    }

    if (!input.gradingSchemeId) {
        errors.push({ field: "gradingSchemeId", message: "required" });
    } else {
        const exists = db.gradingSchemes.some(
            (s) => s.id === input.gradingSchemeId
        );
        if (!exists) {
            errors.push({ field: "gradingSchemeId", message: "not found" });
        } else {
            value.gradingSchemeId = input.gradingSchemeId;
        }
    }

    const conflict = db.subjects.find(
        (s) => s.code === input.code && s.id !== existingId
    );
    if (conflict) {
        errors.push({ field: "code", message: "must be unique" });
    }

    value.name = input.name || "";

    return { ok: errors.length === 0, errors, value };
}
