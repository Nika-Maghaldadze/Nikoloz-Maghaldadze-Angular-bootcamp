import {
  assertId,
  assertPositiveInteger,
  assertEnum,
} from "../utils/validator.js";
import timeProvider from "../utils/timeProvider.js";

export default class Enrollment {
  constructor(id, studentId, subjectId, termId, attemptNumber = 1, status) {
    this.id = assertId(id, "enrollment.id");
    this.studentId = assertId(studentId, "enrollment.studentId");
    this.subjectId = assertId(subjectId, "enrollment.subjectId");
    this.termId = assertId(termId, "enrollment.termId");
    this.attemptNumber = assertPositiveInteger(
      attemptNumber,
      "enrollment.attemptNumber"
    );
    this.status = assertEnum(
      status || "active",
      ["active", "dropped", "withdrawn", "completed"],
      "enrollment.status"
    );
    this.createdAt = timeProvider.nowISO();
    this.droppedAt = null;
    this.withdrawnAt = null;
    this.completedAt = null;
  }
}
