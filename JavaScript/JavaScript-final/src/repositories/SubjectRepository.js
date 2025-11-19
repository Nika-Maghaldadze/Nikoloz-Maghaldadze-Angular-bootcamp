import Repository from "./Repository.js";
import Subject from "../models/Subject.js";
import { ConflictError } from "../utils/errors.js";

export default class SubjectRepository extends Repository {
  constructor() {
    super("Subject");
  }

  createSubject(data) {
    const existing = this.findWhere((s) => s.code === data.code);
    if (existing.length > 0) {
      throw new ConflictError(`Subject code '${data.code}' already exists`);
    }

    const id = this.generateId();
    const subject = new Subject(
      id,
      data.code,
      data.name,
      data.creditHours,
      data.gradingSchemeId,
      data.mode
    );
    return this.create(subject);
  }
}
