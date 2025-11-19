
import { ValidationError } from "../utils/errors.js";

export default class ValidationService {
  constructor(repos) {
    this.repos = repos;
  }

  ensureStudentExists(id) {
    return this.repos.students.findById(id);
  }

  ensureSubjectExists(id) {
    return this.repos.subjects.findById(id);
  }

  ensureTermExists(id) {
    return this.repos.terms.findById(id);
  }

  ensureGradingSchemeExists(id) {
    return this.repos.gradingSchemes.findByIdString(id);
  }

  validateEnrollmentCreation({ studentId, subjectId, termId, attemptNumber }) {
    this.ensureStudentExists(studentId);
    const subject = this.ensureSubjectExists(subjectId);
    this.ensureTermExists(termId);
    this.ensureGradingSchemeExists(subject.gradingSchemeId);

    const existing = this.repos.enrollments.findByStudentAndSubject(
      studentId,
      subjectId
    );
    const active = existing.find((e) => e.status === "active");
    if (active) {
      throw new ValidationError(
        `Student ${studentId} is already actively enrolled in subject ${subjectId}`
      );
    }

    if (attemptNumber && attemptNumber > 5) {
      throw new ValidationError("Too many attempts for the same subject");
    }
  }

  validateEnrollmentStatusChange(enrollment, newStatus) {
    if (!enrollment) {
      throw new ValidationError("Enrollment must exist");
    }
    const allowed = ["active", "dropped", "withdrawn", "completed"];
    if (!allowed.includes(newStatus)) {
      throw new ValidationError("Invalid enrollment status");
    }
    if (enrollment.status === "completed") {
      throw new ValidationError("Cannot change status of completed enrollment");
    }
  }

  validateScoreCreation({ enrollmentId, assessmentId, score }) {
    const enrollment = this.repos.enrollments.findById(enrollmentId);
    const assessment = this.repos.assessments.findById(assessmentId);
    if (enrollment.subjectId !== assessment.subjectId) {
      throw new ValidationError(
        "Assessment subject does not match enrollment subject"
      );
    }
    if (score > assessment.maxScore) {
      throw new ValidationError("Score cannot exceed assessment maxScore");
    }
  }
}
