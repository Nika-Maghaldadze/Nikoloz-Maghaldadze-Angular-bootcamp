import { BaseRepository } from "./baseRepository.js";
export class ScoreRepository extends BaseRepository {
    constructor() {
        super("scores");
    }
}
export const scoreRepo = new ScoreRepository();
