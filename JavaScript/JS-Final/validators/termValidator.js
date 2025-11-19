import { parseISO } from "../utils/date.js";
import { db } from "../repositories/baseRepository.js";

export function validateTerm(input, { existingId = null } = {}) {
    const errors = [];
    const value = {};

    if (!input.name || !String(input.name).trim()) {
        errors.push({ field: "name", message: "required" });
    } else {
        const conflict = db.terms.find(
            (t) => t.name === input.name && t.id !== existingId
        );
        if (conflict) {
            errors.push({ field: "name", message: "must be unique" });
        } else {
            value.name = String(input.name).trim();
        }
    }
    try {
        const sd = parseISO(input.startDate);
        const ed = parseISO(input.endDate);

        if (sd.getTime() >= ed.getTime()) {
            errors.push({
                field: "dates",
                message: "startDate must be < endDate",
            });
        } else {
            value.startDate = input.startDate;
            value.endDate = input.endDate;
        }
    } catch {
        errors.push({ field: "dates", message: "invalid ISO date(s)" });
    }

    return { ok: errors.length === 0, errors, value };
}
