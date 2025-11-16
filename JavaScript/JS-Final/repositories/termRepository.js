import { BaseRepository } from "./baseRepository.js";
export class TermRepository extends BaseRepository {
    constructor() {
        super("terms");
    }
}
export const termRepo = new TermRepository();
