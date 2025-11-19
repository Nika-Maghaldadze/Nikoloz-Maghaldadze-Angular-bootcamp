import Repository from "./Repository.js";
import Student from "../models/Student.js";

export default class StudentRepository extends Repository {
  constructor() {
    super("Student");
  }

  createStudent(data) {
    const id = this.generateId();
    const s = new Student(
      id,
      data.firstName,
      data.lastName,
      data.gradeLevel,
      data.meta
    );
    return this.create(s);
  }
}
