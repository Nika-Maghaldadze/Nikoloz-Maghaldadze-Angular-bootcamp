import { rankingService } from "../services/rankingService.js";
export async function menuRanking() {
    const termId = await ask("termId: ");
    console.log(rankingService.rank(termId));
}
