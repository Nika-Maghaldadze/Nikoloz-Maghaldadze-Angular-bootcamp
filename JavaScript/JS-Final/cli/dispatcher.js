import { menuMain } from "../menu/menuMain.js";
import { menuStudent } from "../menu/menuStudent.js";
import { menuSubject } from "../menu/menuSubject.js";
import { menuTerm } from "../menu/menuTerm.js";
import { menuEnrollment } from "../menu/menuEnrollment.js";
import { menuAssessment } from "../menu/menuAssessment.js";
import { menuScore } from "../menu/menuScore.js";
import { menuAttendance } from "../menu/menuAttendance.js";
import { menuTranscript } from "../menu/menuTranscript.js";
import { menuRanking } from "../menu/menuRanking.js";
import { menuLeaderboard } from "../menu/menuLeaderboard.js";
import { menuDistribution } from "../menu/menuDistribution.js";
import { menuAttendanceSummary } from "../menu/menuAttendanceSummary.js";
import { menuPolicy } from "../menu/menuPolicy.js";
import { menuPersistence } from "../menu/menuPersistence.js";

export async function dispatch(choice) {
    switch (choice) {
        case "0":
            return "exit";
        case "1":
            return menuStudent();
        case "2":
            return menuSubject();
        case "3":
            return menuTerm();
        case "4":
            return menuEnrollment();
        case "6":
            return menuAssessment();
        case "7":
            return menuScore();
        case "8":
            return menuAttendance();
        case "9":
            return menuTranscript();
        case "10":
            return menuRanking();
        case "11":
            return menuLeaderboard();
        case "12":
            return menuDistribution();
        case "13":
            return menuAttendanceSummary();
        case "14":
            return menuPolicy();
        case "15":
            return menuPersistence();
        default:
            console.log("Invalid option.");
    }
}
