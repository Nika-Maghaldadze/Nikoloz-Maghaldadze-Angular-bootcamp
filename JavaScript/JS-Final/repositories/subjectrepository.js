import { BaseRepository } from "./baseRepository.js";
export class SubjectRepository extends BaseRepository {
    constructor() {
        super("subjects");
    }
}
export const subjectRepo = new SubjectRepository();
