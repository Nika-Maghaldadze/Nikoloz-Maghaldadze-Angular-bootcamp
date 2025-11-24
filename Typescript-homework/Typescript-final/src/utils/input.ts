import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function closeInput(): void {
  rl.close();
}

export function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer: string) => {
      resolve(answer.trim());
    });
  });
}

export async function pause(
  message = "Press Enter to continue..."
): Promise<void> {
  await question(message);
}

export async function askNonEmpty(prompt: string): Promise<string> {
  while (true) {
    const answer = await question(prompt);
    if (answer.trim() === "") {
      console.log("This field is required. Please enter a value.");
      continue;
    }
    return answer;
  }
}

export async function askOptional(prompt: string): Promise<string | null> {
  const answer = await question(prompt + " (leave empty to skip): ");
  if (answer.trim() === "") return null;
  return answer;
}

export async function askNumberInRange(
  prompt: string,
  min: number,
  max: number
): Promise<number | null> {
  while (true) {
    const answer = await question(`${prompt} (${min}-${max}, or Enter to cancel): `);
    if (answer === "") return null;
    const n = Number(answer);
    if (Number.isInteger(n) && n >= min && n <= max) {
      return n;
    }
    console.log("Invalid number. Try again.");
  }
}

export async function confirm(prompt: string): Promise<boolean> {
  while (true) {
    const answer = (await question(`${prompt} (y/n): `)).toLowerCase();
    if (answer === "y" || answer === "yes") return true;
    if (answer === "n" || answer === "no") return false;
    console.log("Please enter 'y' or 'n'.");
  }
}

export async function chooseFromList<T>(
  items: T[],
  getLabel: (item: T, index: number) => string,
  allowCancel = true
): Promise<T | null> {
  if (items.length === 0) { 
    console.log("Nothing to choose from.");
    return null;
  }

  items.forEach((item, index) => {
    console.log(`${index + 1}) ${getLabel(item, index)}`);
  });

  const min = 1;
  const max = items.length;

  while (true) {
    const extra = allowCancel ? " (or Enter to cancel)" : "";
    const answer = await question(`Select ${min}-${max}${extra}: `);
    if (allowCancel && answer === "") return null;

    const n = Number(answer);
    if (Number.isInteger(n) && n >= min && n <= max) {
      return items[n - 1];
    }

    console.log("Invalid selection. Try again.");
  }
}
