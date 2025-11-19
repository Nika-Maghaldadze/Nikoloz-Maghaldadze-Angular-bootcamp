export const timeProvider = {
  now() {
    return new Date();
  },
  nowISO() {
    return new Date().toISOString();
  },
};

export default timeProvider;
