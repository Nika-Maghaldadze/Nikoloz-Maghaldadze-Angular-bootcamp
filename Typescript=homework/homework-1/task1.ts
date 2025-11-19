export abstract class LibraryItem {
  protected readonly id: string;
  public title: string;
  private _available = true;

  constructor(id: string, title: string) {
    if (!id.trim()) throw new Error("id required");
    if (!title.trim()) throw new Error("title required");
    this.id = id;
    this.title = title;
  }

  public borrow(): void {
    if (!this._available) throw new Error("Already borrowed");
    this._available = false;
  }

  public return(): void {
    if (this._available) throw new Error("Not borrowed");
    this._available = true;
  }

  public isAvailable(): boolean {
    return this._available;
  }

  public abstract getLabel(): string;
}

export class Book extends LibraryItem {
  public author: string;
  constructor(id: string, title: string, author: string) {
    super(id, title);
    if (!author.trim()) throw new Error("author required");
    this.author = author;
  }
  public getLabel(): string {
    return `Book: ${this.title} by ${this.author}`;
  }
}

export class Dvd extends LibraryItem {
  public readonly durationMin: number;
  constructor(id: string, title: string, durationMin: number) {
    super(id, title);
    if (durationMin <= 0) throw new Error("durationMin must be > 0");
    this.durationMin = durationMin;
  }
  public getLabel(): string {
    return `DVD: ${this.title} (${this.durationMin} min)`;
  }
}

export function usecase_task1() {
  const book = new Book("A1", "Lord Of The Rings", "John Ronald Reuel Tolkien");
  console.log(book.isAvailable());
  book.borrow();
  console.log(book.isAvailable());
  book.return();
  console.log(book.getLabel());

  const dvd = new Dvd("D1", "Scarface", 165);
  console.log(dvd.getLabel());
}
