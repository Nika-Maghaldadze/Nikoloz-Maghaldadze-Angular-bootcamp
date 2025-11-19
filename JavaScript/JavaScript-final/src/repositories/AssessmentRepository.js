import Repository from "./Repository.js";
import Assessment from "../models/Assessment.js";

export default class AssessmentRepository extends Repository {
  constructor() {
    super("Assessment");
  }

  createAssessment(data) {
    const id = this.generateId();
    const assessment = new Assessment(
      id,
      data.subjectId,
      data.termId,
      data.name,
      data.maxScore,
      data.weightPercent
    );
    return this.create(assessment);
  }

  findBySubject(subjectId) {
    return this.findWhere((a) => a.subjectId === subjectId);
  }

  findByTerm(termId) {
    return this.findWhere((a) => a.termId === termId);
  }
}
