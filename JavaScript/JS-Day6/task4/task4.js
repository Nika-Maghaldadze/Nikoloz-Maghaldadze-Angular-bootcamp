class User {
  #id; #email;
  constructor(id, email) {
    if (!/^[A-Z0-9]{6}$/.test(id) || !email.includes("@") || email.split("@").length !== 2)
      throw new Error("INVALID_USER");
    this.#id = id;
    this.#email = email;
  }
  id() { return this.#id; }
  email() { return this.#email; }
  toString() { return `USER:${this.#id}|${this.#email}`; }
}

class UserRegistry {
  #byId;
  constructor() { this.#byId = {}; }

  add(u) {
    if (!(u instanceof User)) throw new Error("INVALID_USER");
    if (this.#byId[u.id()]) throw new Error("DUPLICATE_ID");
    this.#byId[u.id()] = u;
  }

  remove(id) {
    if (!this.#byId[id]) throw new Error("NOT_FOUND");
    delete this.#byId[id];
  }

  findByDomain(domain) {
    const arr = Object.values(this.#byId).filter(u => u.email().endsWith(`@${domain}`));
    return arr.sort((a, b) => a.id().localeCompare(b.id()));
  }
}


const reg = new UserRegistry();
reg.add(new User("ABC123", "ana@mail.com"));
reg.add(new User("DEF456", "beka@mail.com"));
console.log("findByDomain:", reg.findByDomain("mail.com").map(u => u.toString()));