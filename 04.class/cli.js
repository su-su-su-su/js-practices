import readline from "readline";
import enquirer from "enquirer";

export class Cli {
  readStdin() {
    return new Promise((resolve) => {
      const lines = [];
      const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      reader.on("line", (line) => {
        lines.push(line);
      });

      reader.on("close", () => {
        resolve(lines);
      });
    });
  }

  async selectPrompt(message, firstLines) {
    const { selectMemo } = await enquirer.prompt({
      type: "select",
      name: "selectMemo",
      message: message,
      choices: firstLines,
    });
    return selectMemo;
  }
}
