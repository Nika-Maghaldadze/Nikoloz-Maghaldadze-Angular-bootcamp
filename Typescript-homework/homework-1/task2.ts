export class Fx {
  private static rates = new Map<string, number>();
  private constructor() {}

  static setRate(code: string, rate: number): void {
    const c = code.trim().toUpperCase();
    if (!c) throw new Error("code required");
    if (rate <= 0) throw new Error("rate must be > 0");
    this.rates.set(c, rate);
  }

  static convert(amount: number, source: string, target: string): number {
    if (amount < 0) throw new Error("invalid amount");
    const s = source.trim().toUpperCase();
    const t = target.trim().toUpperCase();
    const sRate = this.rates.get(s);
    const tRate = this.rates.get(t);
    if (!sRate) throw new Error(`Unknown code: ${s}`);
    if (!tRate) throw new Error(`Unknown code: ${t}`);
    return (amount / sRate) * tRate;
  }
}

export function usecase_task2() {
  Fx.setRate("GEL", 1);
  Fx.setRate("EUR", 3.1);
  Fx.setRate("USD", 2.7);

  console.log(Fx.convert(100, "USD", "EUR"));
  console.log(Fx.convert(50, "GEL", "USD"));
}

