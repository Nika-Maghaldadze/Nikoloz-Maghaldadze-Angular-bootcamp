import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',

  //სანამ ეს არ დავწერე არ იმუშავა
  standalone:false
})
export class FormatTimePipe implements PipeTransform {
  transform(ms: number): string {
    const totalMs = Math.max(0, Math.floor(ms));
    const totalSeconds = Math.floor(totalMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    if (hours > 0) {
      const hh = String(hours).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
  }
}
