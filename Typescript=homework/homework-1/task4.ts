export interface Entity { id: string; }

export class InMemoryRepo<T extends Entity> {
  private store = new Map<string, T>();

  add(e: T): void {
    if (this.store.has(e.id)) throw new Error("duplicate id");
    this.store.set(e.id, e);
  }

  get(id: string): T | undefined {
    return this.store.get(id);
  }

  update(id: string, patch: Partial<Omit<T, "id">>): T {
    const existing = this.store.get(id);
    if (!existing) throw new Error("not found");
    const updated = { ...existing, ...patch, id } as T;
    this.store.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.store.delete(id);
  }

  all(): T[] {
    return [...this.store.values()];
  }
}

export function usecase_task4() {
  const repo = new InMemoryRepo<{ id: string; name: string }>();
  repo.add({ id: "1", name: "Nika" });
  repo.add({ id: "2", name: "Giorgi" });

  console.log(repo.get("1"));
  console.log(repo.update("2", { name: "Iakobi" }));
  console.log(repo.all());
  repo.remove("1");
}