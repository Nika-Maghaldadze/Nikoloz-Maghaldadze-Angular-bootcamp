import { attendanceService } from "../services/attendanceService.js";
export async function menuAttendanceSummary() {
    const termId = await ask("termId: ");
    const subjectId = await ask("subjectId (optional): ");
    console.log(attendanceService.summary(termId, subjectId || null));
}
