// 6.Group by Property
// Given an array of objects:
// const students = [
//   { name: "Ana", grade: "A" },
//   { name: "Beka", grade: "B" },
//   { name: "Luka", grade: "A" }
// ];
// groupBy(students, "grade") that returns:
// { A: ["Ana", "Luka"], B: ["Beka"] }

function groupBy(arr, prop) {
  if (!Array.isArray(arr)) throw new TypeError("First argument must be an array");
  const grouped = {};
  for (const item of arr) {
    if (item && typeof item === "object" && prop in item) {
      const key = item[prop];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item.name);
    }
  }
  return grouped;
}

const students = [
  { name: "Ana", grade: "A" },
  { name: "Beka", grade: "B" },
  { name: "Luka", grade: "A" },
];
console.log(groupBy(students, "grade"));