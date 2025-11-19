import { assertId, assertPositiveInteger } from "../utils/validator.js";

export default class Score {
  constructor(id, enrollmentId, assessmentId, score) {
    this.id = assertId(id, "score.id");
    this.enrollmentId = assertId(enrollmentId, "score.enrollmentId");
    this.assessmentId = assertId(assessmentId, "score.assessmentId");
    this.score = assertPositiveInteger(score, "score.score");
  }
}
