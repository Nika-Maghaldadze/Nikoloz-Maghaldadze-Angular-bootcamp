import { add, subtract, multiply } from "./math.mjs";
import reverse, { toUpper, toLower } from "./text.mjs";
import log from "./logger.mjs";

log("Starting program...");

const a = 10, b = 5;
log(`Add: ${add(a, b)}`);
log(`Subtract: ${subtract(a, b)}`);
log(`Multiply: ${multiply(a, b)}`);

const text = "JavaScript Modules";
log(`Uppercase: ${toUpper(text)}`);
log(`Lowercase: ${toLower(text)}`);
log(`Reversed: ${reverse(text)}`);

log("Program finished successfully!", "SUCCESS");
