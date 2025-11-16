import { BaseRepository } from "./baseRepository.js";
export class SchemeRepository extends BaseRepository {
    constructor() {
        super("gradingSchemes");
    }
}
export const schemeRepo = new SchemeRepository();
