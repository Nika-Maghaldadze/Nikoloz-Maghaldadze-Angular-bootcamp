import { question } from "../cli/input.js";
import { studentRepo } from "../repositories/studentRepository.js";
import { validateStudent } from "../validators/studentValidator.js";
export async function menuStudent() {
    console.log("=== CREATE STUDENT ===");
    const firstName = await question("First name: ");
    const lastName = await question("Last name: ");
    const gradeLevel = await question("Grade level: ");
    const email = await question("Email (optional): ");
    const guardianName = await question("Guardian (optional): ");
    const student = {
        firstName,
        lastName,
        gradeLevel,
        meta: { email, guardianName },
    };
    const v = validateStudent(student);
    if (v.error) return console.log(v);
    const created = studentRepo.create(student);
    console.log("Created:", created);
}
