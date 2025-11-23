export function isValidISODate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;

  const [year, month, day] = dateStr.split("-").map((x) => Number(x));
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() + 1 === month &&
    d.getUTCDate() === day
  );
}
