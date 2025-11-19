export abstract class Shape {
  protected name: string;
  constructor(name: string) {
    if (!name.trim()) throw new Error("name is required!");
    this.name = name;
  }
  abstract area(): number;
  abstract perimeter(): number;

  toString(): string {
    return `${this.name} Area = ${this.area()} Perimeter = ${this.perimeter()}`;
  }
}

export class Rectangle extends Shape {
  readonly width: number;
  readonly height: number;

  constructor(name: string, width: number, height: number) {
    super(name);
    if (width <= 0 || height <= 0) throw new Error("Invalid dimensions");
    this.width = width;
    this.height = height;
  }

  area() { return this.width * this.height; }
  perimeter() { return 2 * (this.width + this.height); }
}

export class Circle extends Shape {
  readonly radius: number;
  constructor(name: string, radius: number) {
    super(name);
    if (radius <= 0) throw new Error("radius required > 0");
    this.radius = radius;
  }

  area() { return Math.PI * this.radius * this.radius; }
  perimeter() { return 2 * Math.PI * this.radius; }
}

export function usecase_task3() {
  const r = new Rectangle("Rectangle", 10, 5);
  console.log(r.toString());

  const c = new Circle("Circle", 10);
  console.log(c.toString());
}