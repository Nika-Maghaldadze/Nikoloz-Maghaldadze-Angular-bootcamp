function parseCSV(lines) {
  return lines.map(line => {
    const [id, name, gpa, active] = line.split(",");
    return {
      id: Number(id),
      name,
      gpa: Number(gpa),
      active: active === "true"
    };
  });
}
console.log(parseCSV(["42,Ana,3.5,true"]));
console.log(parseCSV(["1,Bob,2.8,false", "2,Lia,3.9,true"]));
