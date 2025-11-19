export default class PolicyManager {
  constructor(repos) {
    this.repos = repos;
    this.defaultPassingPercent = 60;
    this.gpaScale = {
      A: 4.0,
      B: 3.0,
      C: 2.0,
      D: 1.0,
      F: 0.0,
    };
  }

  setPassingPercent(value) {
    this.defaultPassingPercent = value;
  }

  setGpaScale(scale) {
    this.gpaScale = { ...this.gpaScale, ...scale };
  }

  getPassingPercent() {
    return this.defaultPassingPercent;
  }

  getGpaValue(letter) {
    return this.gpaScale[letter] ?? 0.0;
  }
}
