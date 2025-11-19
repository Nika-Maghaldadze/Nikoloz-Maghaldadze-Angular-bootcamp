import { termRepo } from "../repositories/termRepository.js";
import { validateTerm } from "../validators/termValidator.js";
export async function menuTerm() {
    console.log("=== CREATE TERM ===");
    const name = await ask("Term name: ");
    const startDate = await ask("Start (YYYY-MM-DD): ");
    const endDate = await ask("End (YYYY-MM-DD): ");
    const term = { name, startDate, endDate };
    const v = validateTerm(term);
    if (v.error) return console.log(v);
    console.log("Created:", termRepo.create(term));
}
