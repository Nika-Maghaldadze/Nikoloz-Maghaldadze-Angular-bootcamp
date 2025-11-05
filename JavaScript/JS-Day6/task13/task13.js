class Show {
  #title; #rows; #cols; #seats;
  constructor(title, rows, cols) {
    if (!title || rows < 1 || cols < 1 || !Number.isInteger(rows) || !Number.isInteger(cols))
      throw new Error("INVALID_SHOW");
    this.#title = title;
    this.#rows = rows;
    this.#cols = cols;
    this.#seats = Array.from({ length: rows }, () => Array(cols).fill("."));
  }

  labelOf(r, c) {
    if (r < 0 || r >= this.#rows || c < 0 || c >= this.#cols)
      throw new Error("INVALID_SEAT");
    const rowLabel = String.fromCharCode(65 + r);
    const colLabel = String(c + 1).padStart(2, "0");
    return `${rowLabel}${colLabel}`;
  }

  indexOf(label) {
    if (!/^[A-Z][0-9]{2,}$/.test(label)) throw new Error("INVALID_SEAT");
    const r = label.charCodeAt(0) - 65;
    const c = parseInt(label.slice(1), 10) - 1;
    if (r < 0 || r >= this.#rows || c < 0 || c >= this.#cols)
      throw new Error("INVALID_SEAT");
    return { r, c };
  }

  reserve(label) {
    const { r, c } = this.indexOf(label);
    if (this.#seats[r][c] === "X") throw new Error("TAKEN");
    this.#seats[r][c] = "X";
  }

  cancel(label) {
    const { r, c } = this.indexOf(label);
    if (this.#seats[r][c] === ".") throw new Error("NOT_RESERVED");
    this.#seats[r][c] = ".";
  }

  available() {
    return this.#seats.flat().filter(s => s === ".").length;
  }
}


const show = new Show("Movie Night", 3, 3);
show.reserve("A01");
show.reserve("B02");
console.log("Show Available:", show.available());