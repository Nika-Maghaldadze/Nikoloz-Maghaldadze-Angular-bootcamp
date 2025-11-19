import { ValidationError } from "./errors.js";

export function normalizeString(value) {
  if (value == null) return "";
  return String(value).trim().replace(/\s+/g, " ");
}

export function assertNonEmptyString(value, fieldName) {
  const normalized = normalizeString(value);
  if (!normalized) {
    throw new ValidationError(`${fieldName} is required`);
  }
  return normalized;
}

export function assertOptionalString(value) {
  if (value == null) return null;
  const normalized = normalizeString(value);
  if (!normalized) {
    return null;
  }
  return normalized;
}

export function assertPositiveInteger(value, fieldName) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    throw new ValidationError(`${fieldName} must be a positive integer`);
  }
  return n;
}

export function assertId(value, fieldName = "id") {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) {
    throw new ValidationError(`${fieldName} must be a non-negative integer`);
  }
  return n;
}

export function assertEmail(value, fieldName = "email") {
  const normalized = normalizeString(value);
  if (!normalized) return null;

  const parts = normalized.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new ValidationError(`${fieldName} must contain exactly one '@'`);
  }
  return normalized;
}

export function assertEnum(value, allowed, fieldName) {
  if (!allowed.includes(value)) {
    throw new ValidationError(
      `${fieldName} must be one of: ${allowed.join(", ")}`
    );
  }
  return value;
}

export function assertDateStringISO(value, fieldName) {
  const str = normalizeString(value);
  const t = Date.parse(str);
  if (Number.isNaN(t)) {
    throw new ValidationError(`${fieldName} must be a valid date string`);
  }
  return new Date(t).toISOString();
}

const Validator = {
  normalizeString,
  assertNonEmptyString,
  assertOptionalString,
  assertPositiveInteger,
  assertId,
  assertEmail,
  assertEnum,
  assertDateStringISO,
};

export default Validator;
