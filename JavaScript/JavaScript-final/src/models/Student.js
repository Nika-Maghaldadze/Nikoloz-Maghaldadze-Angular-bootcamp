import Validator, {
  assertId,
  assertNonEmptyString,
  assertEmail,
  assertOptionalString,
} from "../utils/validator.js";

export default class Student {
  constructor(id, firstName, lastName, gradeLevel, meta = {}) {
    this.id = assertId(id, "student.id");
    this.firstName = assertNonEmptyString(firstName, "student.firstName");
    this.lastName = assertNonEmptyString(lastName, "student.lastName");
    this.gradeLevel = Validator.normalizeString(gradeLevel);

    const normalizedMeta = {};
    const guardianName = assertOptionalString(
      meta.guardianName,
      "student.meta.guardianName"
    );
    if (guardianName) normalizedMeta.guardianName = guardianName;

    if (meta.email != null) {
      normalizedMeta.email = assertEmail(meta.email, "student.meta.email");
    }

    this.meta = normalizedMeta;
  }
}
