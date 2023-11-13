import minimist from "minimist";
const argv = minimist(process.argv.slice(2), {
  alias: {
    m: "month",
    y: "year",
  },
});
let now = new Date();
let year = argv.year || now.getFullYear();
let month = argv.month || now.getMonth() + 1;
let day_first = new Date(year, month - 1, 1);
let day_end = new Date(year, month, 0);
console.log(year + "年" + month + "月");
console.log(" 日 月 火 水 木 金 土");
process.stdout.write(" ".repeat(3 * day_first.getDay()));
while (day_first <= day_end) {
  process.stdout.write(day_first.getDate().toString().padStart(3, " "));
  if (day_first.getDay() === 6) {
    process.stdout.write("\n");
  }
  day_first.setDate(day_first.getDate() + 1);
}
