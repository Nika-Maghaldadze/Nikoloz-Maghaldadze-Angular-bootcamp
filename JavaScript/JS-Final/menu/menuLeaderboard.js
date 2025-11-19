import { leaderboardService } from "../services/leaderboardService.js";
export async function menuLeaderboard() {
    const subjectId = await ask("subjectId: ");
    const termId = await ask("termId: ");
    const limit = Number(await ask("limit (default 10): "));
    console.log(leaderboardService.leaderboard(subjectId, termId, limit));
}
