import { db } from "../repositories/baseRepository.js";
import { parseISO } from "../utils/date.js";
import { now } from "../now.js";

export function validateEnroll({
    studentId,
    subjectId,
    termId,
    overrideLate = false,
}) {
    const errors = [];
    const computed = {};

    const student = db.students.find((s) => s.id === studentId);
    if (!student) {
        errors.push({ field: "studentId", message: "not found" });
    }

    const subject = db.subjects.find((s) => s.id === subjectId);
    if (!subject) {
        errors.push({ field: "subjectId", message: "not found" });
    }

    const term = db.terms.find((t) => t.id === termId);
    if (!term) {
        errors.push({ field: "termId", message: "not found" });
    }

    if (errors.length) {
        return { ok: false, errors };
    }

    const active = db.enrollments.find(
        (e) =>
            e.studentId === studentId &&
            e.subjectId === subjectId &&
            e.termId === termId &&
            e.status === "active"
    );

    if (active) {
        errors.push({
            field: "enrollment",
            message: "active enrollment already exists",
        });
    }

    const attempts = db.enrollments.filter(
        (e) => e.studentId === studentId && e.subjectId === subjectId
    );

    const highest = attempts.reduce(
        (mx, cur) => Math.max(mx, cur.attemptNumber || 0),
        0
    );

    computed.attemptNumber = highest + 1;

    const policy = db.policies.find((p) => p.termId === termId) || {
        lateEnrollmentCutoff: 14,
    };

    const cutoffDays = Number.isFinite(policy.lateEnrollmentCutoff)
        ? policy.lateEnrollmentCutoff
        : 14;

    const termStart = parseISO(term.startDate);
    const diffDays = Math.floor(
        (now().getTime() - termStart.getTime()) / (24 * 3600 * 1000)
    );

    if (!overrideLate && diffDays > cutoffDays) {
        errors.push({
            field: "lateEnrollment",
            message: "late enrollment cutoff exceeded",
        });
    }

    return { ok: errors.length === 0, errors, computed };
}
