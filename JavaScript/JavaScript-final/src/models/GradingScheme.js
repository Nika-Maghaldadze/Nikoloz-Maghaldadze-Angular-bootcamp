import { assertNonEmptyString } from "../utils/validator.js";

export default class GradingScheme {
  constructor(id, name, mapping) {
    this.id = assertNonEmptyString(id, "gradingScheme.id");
    this.name = assertNonEmptyString(name, "gradingScheme.name");

    this.mapping = mapping || {};
  }
}
