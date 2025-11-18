import { db } from "../repositories/baseRepository.js";
import { parseISO } from "../utils/date.js";

export function validateAssessmentInput(input, { existingId = null } = {}) {
    const errors = [];
    const value = {};

    if (!input.subjectId || !input.termId) {
        errors.push({ field: "subjectId/termId", message: "required" });
    }

    if (typeof input.maxPoints !== "number" || input.maxPoints <= 0) {
        errors.push({ field: "maxPoints", message: "must be > 0" });
    } else {
        value.maxPoints = input.maxPoints;
    }

    const wp = Number(input.weightPercent);
    if (Number.isNaN(wp) || wp < 0 || wp > 100) {
        errors.push({ field: "weightPercent", message: "must be 0..100" });
    } else {
        value.weightPercent = wp;
    }

    if (input.dueDate) {
        try {
            parseISO(input.dueDate);
            value.dueDate = input.dueDate;
        } catch {
            errors.push({ field: "dueDate", message: "invalid ISO" });
        }
    }

    if (!input.name || !String(input.name).trim()) {
        errors.push({ field: "name", message: "required" });
    } else {
        const conflict = db.assessments.find(
            (a) =>
                a.name === input.name &&
                a.subjectId === input.subjectId &&
                a.termId === input.termId &&
                a.id !== existingId
        );

        if (conflict) {
            errors.push({
                field: "name",
                message: "must be unique within subject+term",
            });
        } else {
            value.name = input.name;
        }
    }

    value.type = input.type || "exam";
    value.locked = Boolean(input.locked);

    return { ok: errors.length === 0, errors, value };
}
