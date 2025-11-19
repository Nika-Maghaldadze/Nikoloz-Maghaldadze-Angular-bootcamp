import { dispatch } from "./cli/dispatcher.js";
import { getNow } from "./now.js";
import { question } from "./cli/input.js";

async function main() {
    console.log("=== SIS SYSTEM ===");
    console.log("Current NOW():", getNow());

    while (true) {
        const choice = await question("Select menu (0 for exit): ");
        const result = await dispatch(choice);
        if (result === "exit") break;
    }

    console.log("Goodbye.");
}

main();
