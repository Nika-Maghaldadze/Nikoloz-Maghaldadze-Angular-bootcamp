import { BaseRepository } from "./baseRepository.js";
export class StudentRepository extends BaseRepository {
    constructor() {
        super("students");
    }
}
export const studentRepo = new StudentRepository();
