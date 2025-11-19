import { enrollStudent } from "../services/enrollmentService.js";
import { studentRepo } from "../repositories/studentRepository.js";
import { subjectRepo } from "../repositories/subjectRepository.js";
import { termRepo } from "../repositories/termRepository.js";
export async function menuEnrollment() {
    console.log("=== ENROLL STUDENT ===");
    const studentId = await ask("studentId: ");
    const subjectId = await ask("subjectId: ");
    const termId = await ask("termId: ");
    const override =
        (await ask("Override late cutoff? (y/N): ")).toLowerCase() === "y";
    if (
        !studentRepo.get(studentId) ||
        !subjectRepo.get(subjectId) ||
        !termRepo.get(termId)
    )
        return console.log("NOT_FOUND: invalid IDs");
    const result = enrollStudent.enroll(
        studentId,
        subjectId,
        termId,
        override
    );
    console.log(result);
}
