class BoundedQueue<T> {
  public readonly capacity: number;
  private items: T[];

  constructor(capacity: number) {
    if (capacity <= 0 || !Number.isFinite(capacity)) {
      throw new Error("Capacity must be a positive finite number");
    }

    this.capacity = capacity;
    this.items = [];
  }

  enqueue(item: T): boolean {
    if (this.items.length >= this.capacity) {
      return false;
    }

    this.items.push(item);
    return true;
  }

  dequeue(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }

    const firstItem = this.items.shift();
    return firstItem;
  }

  peek(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }

    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}


const queue = new BoundedQueue<string>(2);
queue.enqueue("A");
queue.enqueue("B");
const addedC = queue.enqueue("C");

