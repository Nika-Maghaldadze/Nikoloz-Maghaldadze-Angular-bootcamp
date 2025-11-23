import type { ID } from "../models/type";

export function generateId(prefix = ""): ID {
  const randomPart = Math.random().toString(36).substring(2, 8);
  const timePart = Date.now().toString(36);
  return `${prefix}${timePart}_${randomPart}`;
}
