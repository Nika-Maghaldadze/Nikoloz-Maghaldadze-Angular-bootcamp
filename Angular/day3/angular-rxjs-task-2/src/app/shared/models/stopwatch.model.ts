export type StopwatchSpeed = 0.5 | 1 | 2 | 5;

export interface LapEntry {
  id: number;
  timeMs: number;
  createdAt: Date;
}

export interface SkipEntry {
  id: number;
  deltaMs: number;
  createdAt: Date;
}

export interface StopwatchViewModel {
  elapsedMs: number;
  running: boolean;
  speed: StopwatchSpeed;
  laps: LapEntry[];
  skips: SkipEntry[];
}
