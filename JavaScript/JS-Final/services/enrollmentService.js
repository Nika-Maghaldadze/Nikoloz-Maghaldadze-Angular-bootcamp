import { enrollmentRepo } from "../repositories/enrollmentRepository.js";
import { studentRepo } from "../repositories/studentRepository.js";
import { subjectRepo } from "../repositories/subjectRepository.js";
import { termRepo } from "../repositories/termRepository.js";
import { generateId } from "../utils/id.js";
import { policy } from "./policyService.js";
import { errorResponse } from "../utils/errors.js";

export function enrollStudent({
    studentId,
    subjectId,
    termId,
    now,
    override = false,
}) {
    const student = studentRepo.getById(studentId);
    const subject = subjectRepo.getById(subjectId);
    const term = termRepo.getById(termId);
    if (!student) return errorResponse("NOT_FOUND", "Student not found");
    if (!subject) return errorResponse("NOT_FOUND", "Subject not found");
    if (!term) return errorResponse("NOT_FOUND", "Term not found");

    if (!override) {
        const diffDays = Math.floor(
            (new Date(now) - new Date(term.startDate)) / 86400000
        );
        if (diffDays > policy.lateCutoff)
            return errorResponse("POLICY_VIOLATION", "Late enrollment cutoff exceeded");
    }

    const existing = enrollmentRepo
        .getAll()
        .find(
            (e) =>
                e.studentId === studentId &&
                e.subjectId === subjectId &&
                e.termId === termId &&
                e.status === "active"
        );
    if (existing) return errorResponse("CONFLICT", "Active enrollment already exists");

    const attempts = enrollmentRepo
        .getAll()
        .filter((e) => e.studentId === studentId && e.subjectId === subjectId);
    const attemptNumber = attempts.length
        ? Math.max(...attempts.map((a) => a.attemptNumber)) + 1
        : 1;

    const enrollment = {
        id: generateId("enr"),
        studentId,
        subjectId,
        termId,
        status: "active",
        createdAt: now,
        attemptNumber,
    };

    enrollmentRepo.create(enrollment);
    return enrollment;
}

export function updateEnrollmentStatus(id, action, now) {
    const enr = enrollmentRepo.getById(id);
    if (!enr) return errorResponse("NOT_FOUND", "Enrollment not found");
    if (enr.status !== "active")
        return errorResponse("ILLEGAL_STATE", "Enrollment not active");

    if (action === "d") (enr.status = "dropped"), (enr.droppedAt = now);
    if (action === "w") (enr.status = "withdrawn"), (enr.completedAt = now);
    if (action === "c") (enr.status = "completed"), (enr.completedAt = now);

    return enr;
}
