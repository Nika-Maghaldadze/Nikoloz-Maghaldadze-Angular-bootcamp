import Repository from "./Repository.js";
import GradingScheme from "../models/GradingScheme.js";
import { ConflictError } from "../utils/errors.js";

export default class GradingSchemeRepository extends Repository {
  constructor() {
    super("GradingScheme");
  }

  createScheme(data) {
    if (this.items.has(data.id)) {
      throw new ConflictError(
        `Grading scheme with id '${data.id}' already exists`
      );
    }
    const scheme = new GradingScheme(data.id, data.name, data.mapping);
    this.items.set(scheme.id, scheme);
    return scheme;
  }

  findByIdString(id) {
    const scheme = this.items.get(id);
    if (!scheme) {
      throw new ConflictError(`Grading scheme '${id}' not found`);
    }
    return scheme;
  }
}
