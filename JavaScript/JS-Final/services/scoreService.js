import { scoreRepo } from "../repositories/scoreRepository.js";
import { assessmentRepo } from "../repositories/assessmentRepository.js";
import { enrollmentRepo } from "../repositories/enrollmentRepository.js";
import { generateId } from "../utils/id.js";
import { errorResponse } from "../utils/errors.js";
import { policy } from "./policyService.js";

export function recordScore({ assessmentId, studentId, points, now }) {
    const assessment = assessmentRepo.getById(assessmentId);
    if (!assessment) return errorResponse("NOT_FOUND", "Assessment not found");
    if (points < 0 || points > assessment.maxPoints)
        return errorResponse("VALIDATION_ERROR", "Invalid points");

    const enr = enrollmentRepo
        .getAll()
        .find(
            (e) =>
                e.studentId === studentId &&
                e.subjectId === assessment.subjectId &&
                e.termId === assessment.termId
        );
    if (!enr) return errorResponse("NOT_FOUND", "Student not enrolled");

    const existing = scoreRepo
        .getAll()
        .find(
            (s) => s.assessmentId === assessmentId && s.studentId === studentId
        );

    if (existing) {
        if (assessment.locked && !policy.allowScoreUpdateAfterLock)
            return errorResponse("ILLEGAL_STATE", "Assessment locked; cannot update");
        existing.points = points;
        existing.recordedAt = now;
        return existing;
    }

    const score = {
        id: generateId("sc"),
        assessmentId,
        studentId,
        points,
        recordedAt: now,
    };

    scoreRepo.create(score);
    return score;
}
