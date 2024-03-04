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
    } else if (argv.r) {
      const memos = await this.memo.readAll();
      if (memos.length === 0) {
        return;
      }
      const firstLines = memos.map((memo) => {
        return memo.split("\n")[0];
      });
      const message = "Choose a note you want to see:";
      const selectMemo = await this.cli.selectPrompt(message, firstLines);
      const id = selectMemo.split(":")[0];
      await this.memo.read(id);
      return;
    } else if (argv.d) {
      const memos = await this.memo.readAll();
      if (memos.length === 0) {
        return;
      }
      const firstLines = memos.map((memo) => {
        return memo.split("\n")[0];
      });
      const message = "Choose a note you want to delete:";
      const selectMemo = await this.cli.selectPrompt(message, firstLines);
      const id = selectMemo.split(":")[0];
      await this.memo.delete(id);
      return;
    }

    const lines = await this.cli.readStdin();
    if (lines.length > 0) {
      await this.memo.write(lines.join("\n"));
    }
  }
}
