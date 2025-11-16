import { BaseRepository } from "./baseRepository.js";
export class AssessmentRepository extends BaseRepository {
    constructor() {
        super("assessments");
    }
}
export const assessmentRepo = new AssessmentRepository();
