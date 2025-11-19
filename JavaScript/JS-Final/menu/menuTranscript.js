import { transcriptService } from "../services/transcriptService.js";
export async function menuTranscript() {
    const studentId = await ask("studentId: ");
    console.log(transcriptService.build(studentId));
}
