import { NotFoundError, ConflictError } from "../utils/errors.js";

export default class Repository {
  constructor(resourceName) {
    this.resourceName = resourceName;
    this.items = new Map();
    this._lastId = 0;
  }

  generateId() {
    this._lastId += 1;
    return this._lastId;
  }

  create(entity) {
    if (this.items.has(entity.id)) {
      throw new ConflictError(
        `${this.resourceName} with id ${entity.id} already exists`
      );
    }
    this.items.set(entity.id, entity);
    return entity;
  }

  findById(id) {
    const item = this.items.get(id);
    if (!item) {
      throw new NotFoundError(this.resourceName, id);
    }
    return item;
  }

  findAll() {
    return Array.from(this.items.values());
  }

  update(id, updates) {
    const item = this.findById(id);
    const updated = { ...item, ...updates };
    this.items.set(id, updated);
    return updated;
  }

  delete(id) {
    const existed = this.items.delete(id);
    if (!existed) {
      throw new NotFoundError(this.resourceName, id);
    }
  }

  findWhere(predicate) {
    return this.findAll().filter(predicate);
  }
}
