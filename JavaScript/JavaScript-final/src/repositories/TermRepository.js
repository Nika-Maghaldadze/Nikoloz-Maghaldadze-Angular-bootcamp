import Repository from "./Repository.js";
import Term from "../models/Term.js";

export default class TermRepository extends Repository {
  constructor() {
    super("Term");
  }

  createTerm(data) {
    const id = this.generateId();
    const term = new Term(id, data.name, data.startDate, data.endDate);
    return this.create(term);
  }
}
