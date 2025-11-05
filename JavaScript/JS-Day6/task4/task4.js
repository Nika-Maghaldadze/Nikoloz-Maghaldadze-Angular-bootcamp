class User {
  #id;
  #email;
  constructor(id, email) {
    if (!/^[A-Z0-9]{6}$/.test(id) || typeof email !== "string" || (email.split("@").length !== 2))
      throw new Error("INVALID_USER");
    this.#id = id;
    this.#email = email;
  }

  id() { return this.#id; }
  email() { return this.#email; }

  toString() { return `USER:${this.#id}|${this.#email}`; }
}

class UserRegistry {
  #byId = new Map();

  add(u) {
    if (!(u instanceof User)) throw new Error("INVALID_USER");
    if (this.#byId.has(u.id())) throw new Error("DUPLICATE_ID");
    this.#byId.set(u.id(), u);
  }

  remove(id) {
    if (!this.#byId.delete(id)) throw new Error("NOT_FOUND");
  }

  findByDomain(domain) {
    const res = [];
    for (const u of this.#byId.values()) {
      if (u.email().endsWith(`@${domain}`)) res.push(u);
    }
    return res.sort((a, b) => a.id().localeCompare(b.id()));
  }
}
