import { attendanceRepo } from "../repositories/attendanceRepository.js";
import { termRepo } from "../repositories/termRepository.js";
import { generateId } from "../utils/id.js";
import { errorResponse } from "../utils/errors.js";
import { isDateBefore, isDateAfter, isValidISO } from "../utils/date.js";

export function recordAttendance({
    studentId,
    subjectId,
    termId,
    date,
    status,
}) {
    const term = termRepo.getById(termId);
    if (!term) return errorResponse("NOT_FOUND", "Term not found");
    if (!isValidISO(date)) return errorResponse("VALIDATION_ERROR", "Invalid date");
    if (isDateBefore(date, term.startDate) || isDateAfter(date, term.endDate))
        return errorResponse("VALIDATION_ERROR", "Date must be within term");

    const dup = attendanceRepo
        .getAll()
        .find(
            (a) =>
                a.studentId === studentId &&
                a.subjectId === subjectId &&
                a.termId === termId &&
                a.date === date
        );
    if (dup) return errorResponse("CONFLICT", "Duplicate attendance entry");

    const entry = {
        id: generateId("att"),
        studentId,
        subjectId,
        termId,
        date,
        status,
    };

    attendanceRepo.create(entry);
    return entry;
}
