import {
  assertId,
  assertNonEmptyString,
  assertDateStringISO,
} from "../utils/validator.js";

export default class Term {
  constructor(id, name, startDate, endDate) {
    this.id = assertId(id, "term.id");
    this.name = assertNonEmptyString(name, "term.name");
    this.startDate = assertDateStringISO(startDate, "term.startDate");
    this.endDate = assertDateStringISO(endDate, "term.endDate");

    if (this.startDate > this.endDate) {
      throw new Error("term.startDate must be before term.endDate");
    }
  }
}
