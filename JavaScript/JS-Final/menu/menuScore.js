import { recordScore } from "../services/scoreService.js";
export async function menuScore() {
    console.log("=== RECORD SCORE ===");
    const assessmentId = await ask("assessmentId: ");
    const studentId = await ask("studentId: ");
    const points = Number(await ask("points: "));
    const res = recordScore.record(assessmentId, studentId, points);
    console.log(res);
}
