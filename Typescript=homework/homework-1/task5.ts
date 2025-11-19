type Handler = (payload: any) => void;

export class EventBus {
  private static _instance: EventBus | null = null;
  private handlers = new Map<string, Set<Handler>>();
  private constructor() {}

  static instance(): EventBus {
    if (!this._instance) this._instance = new EventBus();
    return this._instance;
  }

  on(event: string, handler: Handler): () => void {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler);
    return () => set!.delete(handler);
  }

  emit(event: string, payload?: any) {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const h of [...set]) h(payload);
  }
}

export function usecase_task5() {
  const bus = EventBus.instance();
  let count = 0;

  const unsub = bus.on("ping", (n) => (count += n));
  bus.emit("ping", 5);
  console.log(count);

  unsub();
  bus.emit("ping", 5);
  console.log(count);
}