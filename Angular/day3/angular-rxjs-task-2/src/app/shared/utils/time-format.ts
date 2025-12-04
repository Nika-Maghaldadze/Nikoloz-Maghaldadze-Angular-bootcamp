export function formatTimeMs(elapsedMs: number): string {
  const totalMs = Math.max(0, Math.floor(elapsedMs));
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const seconds = Math.floor((totalMs % 60_000) / 1_000);
  const ms = totalMs % 1_000;
  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');
  const mmm = ms.toString().padStart(3, '0');
  return `${hh}:${mm}:${ss}.${mmm}`;
}
