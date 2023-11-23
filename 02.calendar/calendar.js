import minimist from "minimist";
const argv = minimist(process.argv.slice(2), {
  alias: {
    m: "month",
    y: "year",
  },
});
const now = new Date();
const year = argv.year || now.getFullYear();
const month = argv.month ? argv.month - 1 : now.getMonth();
const currentDate = new Date(year, month, 1);
const dayEnd = new Date(year, month + 1, 0);
console.log(`${(month + 1).toString().padStart(8, " ")}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(" ".repeat(3 * currentDate.getDay()));
while (currentDate <= dayEnd) {
  let dateString = currentDate.getDate().toString();
  if (dateString.length === 1) {
    dateString = " " + dateString;
  }
  process.stdout.write(dateString.padEnd(3, " "));
  if (currentDate.getDay() === 6) {
    process.stdout.write("\n");
  }
  currentDate.setDate(currentDate.getDate() + 1);
}
process.stdout.write("\n");
