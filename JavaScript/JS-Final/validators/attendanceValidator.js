import { db } from "../repositories/baseRepository.js";
import { parseISO } from "../utils/date.js";

export function validateAttendance({
    studentId,
    subjectId,
    termId,
    date,
    status,
}) {
    const errors = [];

    const term = db.terms.find((t) => t.id === termId);
    if (!term) {
        errors.push({ field: "termId", message: "term not found" });
    }

    let parsed = null;
    try {
        parsed = parseISO(date);
    } catch {
        errors.push({ field: "date", message: "invalid date" });
    }

    if (term && parsed) {
        const d = parsed.getTime();
        const sd = parseISO(term.startDate).getTime();
        const ed = parseISO(term.endDate).getTime();

        if (d < sd || d > ed) {
            errors.push({ field: "date", message: "date not within term" });
        }
    }

    if (!["P", "A", "L"].includes(status)) {
        errors.push({ field: "status", message: "must be P/A/L" });
    }

    const exists = db.attendance.find(
        (a) =>
            a.studentId === studentId &&
            a.subjectId === subjectId &&
            a.termId === termId &&
            a.date === date
    );

    if (exists) {
        errors.push({
            field: "attendance",
            message: "duplicate attendance record",
        });
    }

    return { ok: errors.length === 0, errors };
}
