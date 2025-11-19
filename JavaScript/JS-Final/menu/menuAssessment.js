import { createAssessment } from "../services/assessmentService.js";
import { assessmentRepo } from "../repositories/assessmentRepository.js";
export async function menuAssessment() {
    console.log("=== ASSESSMENT MENU ===");
    const c = await ask("(c)reate, (u)pdate, (x)delete: ");
    if (c === "c") {
        const subjectId = await ask("subjectId: ");
        const termId = await ask("termId: ");
        const name = await ask("name: ");
        const type = await ask("type: ");
        const maxPoints = Number(await ask("maxPoints: "));
        const weightPercent = Number(await ask("weightPercent: "));
        const dueDate = await ask("dueDate (optional): ");
        const locked = (await ask("locked? (y/N): ")).toLowerCase() === "y";
        const res = createAssessment.create({
            subjectId,
            termId,
            name,
            type,
            maxPoints,
            weightPercent,
            dueDate: dueDate || null,
            locked,
        });
        return console.log(res);
    }
    if (c === "u") {
        const id = await ask("assessmentId: ");
        const field = await ask("field to update: ");
        const value = await ask("new value: ");
        const res = createAssessment.update(id, field, value);
        return console.log(res);
    }
    if (c === "x") {
        const id = await ask("assessmentId: ");
        const res = createAssessment.remove(id);
        return console.log(res);
    }
}
