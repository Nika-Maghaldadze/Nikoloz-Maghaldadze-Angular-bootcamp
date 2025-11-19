import {
  assertId,
  assertNonEmptyString,
  assertPositiveInteger,
} from "../utils/validator.js";

export default class Assessment {
  constructor(id, subjectId, termId, name, maxScore, weightPercent) {
    this.id = assertId(id, "assessment.id");
    this.subjectId = assertId(subjectId, "assessment.subjectId");
    this.termId = assertId(termId, "assessment.termId");
    this.name = assertNonEmptyString(name, "assessment.name");
    this.maxScore = assertPositiveInteger(maxScore, "assessment.maxScore");
    this.weightPercent = assertPositiveInteger(
      weightPercent,
      "assessment.weightPercent"
    );
  }
}
