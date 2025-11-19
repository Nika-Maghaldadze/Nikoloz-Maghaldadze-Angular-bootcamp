import { policyService } from "../services/policyService.js";
export async function menuPolicy() {
    console.log("=== POLICY MENU ===");
    const field = await ask("Field to update: ");
    const val = await ask("New value: ");
    console.log(policyService.update(field, val));
}
