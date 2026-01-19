import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  const pipe = new FormatTimePipe();

  it('formats 0ms', () => {
    expect(pipe.transform(0)).toBe('00:00');
  });

  it('formats seconds', () => {
    expect(pipe.transform(1_000)).toBe('00:01');
    expect(pipe.transform(59_000)).toBe('00:59');
  });

  it('formats minutes', () => {
    expect(pipe.transform(60_000)).toBe('01:00');
    expect(pipe.transform(61_000)).toBe('01:01');
    expect(pipe.transform(10 * 60_000 + 5_000)).toBe('10:05');
  });

  it('formats hours when >= 1 hour', () => {
    expect(pipe.transform(3_600_000)).toBe('01:00:00');
    expect(pipe.transform(3_661_000)).toBe('01:01:01');
  });
});
