export default class CalculationService {
  constructor(repos, policyManager, validator) {
    this.repos = repos;
    this.policy = policyManager;
    this.validator = validator;
  }

  getEnrollmentScores(enrollmentId) {
    return this.repos.scores.findByEnrollment(enrollmentId);
  }

  getAssessmentsForSubject(subjectId, termId) {
    return this.repos.assessments.findWhere(
      (a) => a.subjectId === subjectId && a.termId === termId
    );
  }

  calculateFinalPercentForEnrollment(enrollmentId) {
    const enrollment = this.repos.enrollments.findById(enrollmentId);

    const assessments = this.getAssessmentsForSubject(
      enrollment.subjectId,
      enrollment.termId
    );

    if (assessments.length === 0) return 0;

    const scores = this.getEnrollmentScores(enrollmentId);

    let totalWeight = 0;
    let weightedSum = 0;

    for (const a of assessments) {
      const score = scores.find((s) => s.assessmentId === a.id);
      if (!score) continue;

      const percent = (score.score / a.maxScore) * 100;

      weightedSum += percent * a.weightPercent;
      totalWeight += a.weightPercent;
    }

    if (totalWeight === 0) return 0;

    return weightedSum / totalWeight;
  }

  getLetterGradeForPercent(percent, gradingScheme) {
    if (!gradingScheme || !gradingScheme.mapping) {
      return "F";
    }

    for (const [letter, range] of Object.entries(gradingScheme.mapping)) {
      if (percent >= range.min && percent <= range.max) {
        return letter;
      }
    }

    return "F";
  }

  calculateGPAForStudent(studentId) {
    const enrollments = this.repos.enrollments.findByStudent(studentId);
    if (enrollments.length === 0) return 0;

    let totalQualityPoints = 0;
    let totalCredits = 0;

    for (const e of enrollments) {
      const subject = this.repos.subjects.findById(e.subjectId);
      const scheme = this.repos.gradingSchemes.findByIdString(
        subject.gradingSchemeId
      );

      const finalPercent = this.calculateFinalPercentForEnrollment(e.id);

      const letter = this.getLetterGradeForPercent(finalPercent, scheme);

      const gpaValue = this.policy.getGpaValue(letter);

      totalQualityPoints += gpaValue * subject.creditHours;
      totalCredits += subject.creditHours;
    }

    if (totalCredits === 0) return 0;

    return totalQualityPoints / totalCredits;
  }
}
