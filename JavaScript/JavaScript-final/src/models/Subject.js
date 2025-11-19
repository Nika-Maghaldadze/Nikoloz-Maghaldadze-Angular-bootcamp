import {
  assertId,
  assertNonEmptyString,
  assertPositiveInteger,
  assertEnum,
} from "../utils/validator.js";

export default class Subject {
  constructor(id, code, name, creditHours, gradingSchemeId, mode = "graded") {
    this.id = assertId(id, "subject.id");
    this.code = assertNonEmptyString(code, "subject.code");
    this.name = assertNonEmptyString(name, "subject.name");
    this.creditHours = assertPositiveInteger(
      creditHours,
      "subject.creditHours"
    );
    this.gradingSchemeId = assertNonEmptyString(
      gradingSchemeId,
      "subject.gradingSchemeId"
    );
    this.mode = assertEnum(mode, ["graded", "passfail"], "subject.mode");
  }
}
