import { question } from "../cli/input.js";

export async function menuMain() {
    console.log("=== MAIN MENU ===");
    console.log("1) Create Student");
    console.log("2) Create Subject");
    console.log("3) Create Term");
    console.log("4) Enroll Student");
    console.log("6) Manage Assessments");
    console.log("7) Record Score");
    console.log("8) Record Attendance");
    console.log("9) Transcript");
    console.log("10) Term Ranking");
    console.log("11) Subject Leaderboard");
    console.log("12) Grade Distribution");
    console.log("13) Attendance Summary");
    console.log("14) Policies");
    console.log("15) Save/Load JSON");
    console.log("0) Exit");
}
