import Repository from "./Repository.js";
import Enrollment from "../models/Enrollment.js";

export default class EnrollmentRepository extends Repository {
  constructor() {
    super("Enrollment");
  }

  createEnrollment(data) {
    const id = this.generateId();
    const enrollment = new Enrollment(
      id,
      data.studentId,
      data.subjectId,
      data.termId,
      data.attemptNumber,
      data.status
    );
    return this.create(enrollment);
  }

  findByStudent(studentId) {
    return this.findWhere((e) => e.studentId === studentId);
  }

  findByStudentAndSubject(studentId, subjectId) {
    return this.findWhere(
      (e) => e.studentId === studentId && e.subjectId === subjectId
    );
  }
}
