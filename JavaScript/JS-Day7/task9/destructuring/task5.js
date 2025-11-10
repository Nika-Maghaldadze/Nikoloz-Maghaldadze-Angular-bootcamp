function normalizeProfile(input) {
  const {
    id,
    user: { first: name, last: surname, city = "Unknown" } = {},
    meta: { lang = "en" } = {}
  } = input;

  return { id, name, surname, city, lang };
}

console.log(
  normalizeProfile({
    id: 7,
    user: { first: "Ana", last: "K", city: "Tbilisi" },
    meta: { lang: "en" },
  })
);

console.log(
  normalizeProfile({
    id: 1,
    user: { first: "Bob", last: "M" },
    meta: {},
  })
);
