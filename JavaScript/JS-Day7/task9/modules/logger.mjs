export default function log(message, type = "INFO") {
  const prefix = type.toUpperCase();
  console.log(`${prefix}: ${message}`);
}
