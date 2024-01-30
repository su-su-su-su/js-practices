import enquirer from "enquirer";
import minimist from "minimist";
import { Memo } from "./memo.js";
import { Cli } from "./cli.js";

async function main() {
  const memo = new Memo();
  const cli = new Cli();
  const argv = minimist(process.argv.slice(2));
  await memo.init();

  if (!process.stdin.isTTY) {
    const lines = await cli.readStdin();
    if (lines.length > 0) {
      await memo.create(lines.join("\n"));
    }
    return;
  }

  if (argv.l) {
    const memos = await memo.list();
    memos.forEach((memo) => {
      const firstLine = memo.split("\n")[0];
      console.log(firstLine);
    });
  } else if (argv.r || argv.d) {
    const memos = await memo.list();
    if (memos.length === 0) {
      console.log("メモはまだありません。");
      return;
    }
    const firstLines = memos.map((memo) => {
      return memo.split("\n")[0];
    });
    const { selectMemo } = await enquirer.prompt({
      type: "select",
      name: "selectMemo",
      message: argv.r
        ? "Choose a note you want to see:"
        : "Choose a note you want to delete:",
      choices: firstLines,
    });

    const id = selectMemo.split(":")[0];
    if (argv.r) {
      await memo.view(id);
    } else if (argv.d) {
      await memo.delete(id);
    }
  }
}

main();
