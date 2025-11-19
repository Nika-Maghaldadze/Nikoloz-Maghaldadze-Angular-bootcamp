import { attendanceService } from "../services/attendanceService.js";
export async function menuAttendance() {
    console.log("=== ATTENDANCE ===");
    const studentId = await ask("studentId: ");
    const subjectId = await ask("subjectId: ");
    const termId = await ask("termId: ");
    const date = await ask("date YYYY-MM-DD: ");
    const status = await ask("status (P/A/L): ");
    console.log(
        attendanceService.record({ studentId, subjectId, termId, date, status })
    );
}
