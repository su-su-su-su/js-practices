import enquirer from "enquirer";
import minimist from "minimist";
import { Memo } from "./memo.js";
import { Cli } from "./cli.js";

export class App {
  constructor() {
    this.memo = new Memo();
    this.cli = new Cli();
  }

  async main() {
    const argv = minimist(process.argv.slice(2));
    await this.memo.init();

    if (argv.l) {
      const memos = await this.memo.readAll();
      memos.forEach((memo) => {
        const firstLine = memo.split("\n")[0];
        console.log(firstLine);
      });
      return;
    } else if (argv.r || argv.d) {
      const memos = await this.memo.readAll();
      if (memos.length === 0) {
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
        await this.memo.read(id);
      } else if (argv.d) {
        await this.memo.delete(id);
      }
      return;
    }

    const lines = await this.cli.readStdin();
    if (lines.length > 0) {
      await this.memo.write(lines.join("\n"));
    }
  }
}
