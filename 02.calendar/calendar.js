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
const firstDate = new Date(year, month, 1);
const dayEnd = new Date(year, month + 1, 0);
console.log(`${(month + 1).toString().padStart(8, " ")}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(" ".repeat(3 * firstDate.getDay()));
for (let day = 1; day <= dayEnd.getDate(); day++) {
  const date = new Date(year, month, day);
  const dateString = day.toString().padStart(2, " ");
  process.stdout.write(dateString);
  if (date.getDay() === 6) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
process.stdout.write("\n");
