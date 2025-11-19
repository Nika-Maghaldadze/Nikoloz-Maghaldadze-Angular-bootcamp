import { subjectRepo } from "../repositories/subjectRepository.js";
import { validateSubject } from "../validators/subjectValidator.js";
export async function menuSubject() {
    console.log("=== CREATE SUBJECT ===");
    const code = await ask("Code (UPPERCASE): ");
    const name = await ask("Name: ");
    const creditHours = parseInt(await ask("Credit hours: "));
    const gradingSchemeId =
        (await ask("Scheme id (default=default): ")) || "default";
    const mode = await ask("Mode (graded/passfail): ");
    const subject = { code, name, creditHours, gradingSchemeId, mode };
    const v = validateSubject(subject);
    if (v.error) return console.log(v);
    console.log("Created:", subjectRepo.create(subject));
}
