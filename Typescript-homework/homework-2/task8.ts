interface Rule<T> {
  name: string;
  check: (value: T) => boolean;
  message: string;
}

class ValidatorBuilder<T> {
  private rules: Rule<T>[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: Rule<T>): this {
    this.rules.push(rule);
    return this;
  }

  validate(value: T): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const rule of this.rules) {
      const passed = rule.check(value);

      if (!passed) {
        errors.push(rule.message);
      }
    }

    const valid = errors.length === 0;

    return { valid, errors };
  } 
}
