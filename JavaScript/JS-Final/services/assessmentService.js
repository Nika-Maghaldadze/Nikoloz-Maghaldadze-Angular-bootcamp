import { assessmentRepo } from "../repositories/assessmentRepository.js";
import { termRepo } from "../repositories/termRepository.js";
import { subjectRepo } from "../repositories/subjectRepository.js";
import { auditWeights } from "../utils/audit.js";
import { generateId } from "../utils/id.js";
import { isDateBefore, isDateAfter, isValidISO } from "../utils/date.js";
import { errorResponse } from "../utils/errors.js";
import { policy } from "./policyService.js";

export function createAssessment(data) {
    const subject = subjectRepo.getById(data.subjectId);
    const term = termRepo.getById(data.termId);
    if (!subject) return errorResponse("NOT_FOUND", "Subject not found");
    if (!term) return errorResponse("NOT_FOUND", "Term not found");

    if (data.dueDate) {
        if (!isValidISO(data.dueDate))
            return errorResponse("VALIDATION_ERROR", "Invalid dueDate");
        if (
            isDateBefore(data.dueDate, term.startDate) ||
            isDateAfter(data.dueDate, term.endDate)
        )
            return errorResponse("VALIDATION_ERROR", "Due date must be inside term");
    }

    const assessments = assessmentRepo
        .getAll()
        .filter(
            (a) => a.subjectId === data.subjectId && a.termId === data.termId
        );

    const testAssessment = [...assessments, data];
    const result = auditWeights(testAssessment, policy.tolerance);
    if (!result.ok) return errorResponse("CONFLICT", "Weight audit failed");

    data.id = generateId("ass");
    assessmentRepo.create(data);
    return data;
}
