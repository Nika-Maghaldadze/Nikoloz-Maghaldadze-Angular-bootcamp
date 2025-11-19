import Repository from "./Repository.js";
import Score from "../models/Score.js";

export default class ScoreRepository extends Repository {
  constructor() {
    super("Score");
  }

  createScore(data) {
    const id = this.generateId();
    const score = new Score(
      id,
      data.enrollmentId,
      data.assessmentId,
      data.score
    );
    return this.create(score);
  }

  findByEnrollment(enrollmentId) {
    return this.findWhere((s) => s.enrollmentId === enrollmentId);
  }
}
