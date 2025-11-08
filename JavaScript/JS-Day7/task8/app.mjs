import { add, subtract, multiply } from "./math.mjs";
import constants, { PI, E } from "./constants.mjs";

let result = add(5, 3);
result = multiply(result, PI);
result = subtract(result, E);
console.log("Final result:", result.toFixed(3));
