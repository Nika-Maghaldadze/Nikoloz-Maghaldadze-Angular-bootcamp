import timeProvider from "../utils/timeProvider.js";

export default class SISService {
  constructor(repos, validator, calculator, policy) {
    this.repos = repos;
    this.validator = validator;
    this.calculator = calculator;
    this.policy = policy;
  }

  createStudent(data) {
    return this.repos.students.createStudent(data);
  }

  listStudents() {
    return this.repos.students.findAll();
  }

  createTerm(data) {
    return this.repos.terms.createTerm(data);
  }

  listTerms() {
    return this.repos.terms.findAll();
  }

  createSubject(data) {
    this.validator.ensureGradingSchemeExists(data.gradingSchemeId);
    return this.repos.subjects.createSubject(data);
  }

  listSubjects() {
    return this.repos.subjects.findAll();
  }

  createGradingScheme(data) {
    return this.repos.gradingSchemes.createScheme(data);
  }

  listGradingSchemes() {
    return this.repos.gradingSchemes.findAll();
  }

  enrollStudent(studentId, subjectId, termId, attemptNumber = 1) {
    this.validator.validateEnrollmentCreation({
      studentId,
      subjectId,
      termId,
      attemptNumber,
    });

    return this.repos.enrollments.createEnrollment({
      studentId,
      subjectId,
      termId,
      attemptNumber,
      status: "active",
    });
  }

  dropEnrollment(enrollmentId) {
    const enrollment = this.repos.enrollments.findById(enrollmentId);
    this.validator.validateEnrollmentStatusChange(enrollment, "dropped");

    enrollment.status = "dropped";
    enrollment.droppedAt = timeProvider.nowISO();
    return enrollment;
  }

  withdrawEnrollment(enrollmentId) {
    const enrollment = this.repos.enrollments.findById(enrollmentId);
    this.validator.validateEnrollmentStatusChange(enrollment, "withdrawn");

    enrollment.status = "withdrawn";
    enrollment.withdrawnAt = timeProvider.nowISO();
    return enrollment;
  }

  completeEnrollment(enrollmentId) {
    const enrollment = this.repos.enrollments.findById(enrollmentId);
    this.validator.validateEnrollmentStatusChange(enrollment, "completed");

    enrollment.status = "completed";
    enrollment.completedAt = timeProvider.nowISO();
    return enrollment;
  }

  listEnrollmentsForStudent(studentId) {
    return this.repos.enrollments.findByStudent(studentId);
  }

  createAssessment(data) {
    this.validator.ensureSubjectExists(data.subjectId);
    this.validator.ensureTermExists(data.termId);
    return this.repos.assessments.createAssessment(data);
  }

  listAssessments() {
    return this.repos.assessments.findAll();
  }

  recordScore(data) {
    this.validator.validateScoreCreation(data);
    return this.repos.scores.createScore(data);
  }

  listScores() {
    return this.repos.scores.findAll();
  }

  recordAttendance(data) {
    this.repos.enrollments.findById(data.enrollmentId);
    return this.repos.attendance.createAttendance(data);
  }

  getAttendanceForEnrollment(enrollmentId) {
    return this.repos.attendance.findByEnrollment(enrollmentId);
  }

  getFinalPercentForEnrollment(enrollmentId) {
    return this.calculator.calculateFinalPercentForEnrollment(enrollmentId);
  }

  getGPAForStudent(studentId) {
    return this.calculator.calculateGPAForStudent(studentId);
  }
}
