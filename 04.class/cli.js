import readline from "readline";

class Cli {
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
}

export { Cli };
