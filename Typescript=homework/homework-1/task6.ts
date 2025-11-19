export abstract class Logger {
  log(level: string, msg: string) {
    const text = this.format(level, msg);
    this.write(text);
  }

  protected format(level: string, msg: string): string {
    return `[${new Date().toISOString()}][${level}] ${msg}`;
  }

  protected abstract write(formatted: string): void;
}

export class ConsoleLogger extends Logger {
  protected write(formatted: string): void {
    console.log(formatted);
  }
}

export class BufferedLogger extends Logger {
  private buffer: string[] = [];
  protected write(formatted: string): void {
    this.buffer.push(formatted);
  }
  flush() {
    const data = [...this.buffer];
    this.buffer = [];
    return data;
  }
}

export function usecase_task6() {
  const log = new BufferedLogger();
  log.log("INFO", "Status OK");
  log.log("WARN", "Warning");

  const out = log.flush();
  console.log(out);
}
