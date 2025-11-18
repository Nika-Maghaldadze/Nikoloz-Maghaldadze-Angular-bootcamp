import { db } from "../repositories/baseRepository.js";

export function validateScore({ assessmentId, studentId, points }) {
    const errors = [];

    const a = db.assessments.find((x) => x.id === assessmentId);
    if (!a) errors.push({ field: "assessmentId", message: "not found" });

    const s = db.students.find((x) => x.id === studentId);
    if (!s) errors.push({ field: "studentId", message: "not found" });

    if (
        a &&
        (typeof points !== "number" || points < 0 || points > a.maxPoints)
    ) {
        errors.push({ field: "points", message: "out of range" });
    }

    if (a && s) {
        const enrolled = db.enrollments.find(
            (e) =>
                e.studentId === studentId &&
                e.subjectId === a.subjectId &&
                e.termId === a.termId &&
                (e.status === "active" || e.status === "completed")
        );

        if (!enrolled) {
            errors.push({
                field: "enrollment",
                message: "student not enrolled for this assessment",
            });
        }
    }

    return { ok: errors.length === 0, errors };
}
