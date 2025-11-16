import { BaseRepository } from "./baseRepository.js";
export class EnrollmentRepository extends BaseRepository {
    constructor() {
        super("enrollments");
    }
}
export const enrollmentRepo = new EnrollmentRepository();
