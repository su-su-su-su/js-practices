import sqlite3 from "sqlite3";
import { run, get, close } from "./database-functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:", () => {
    console.log("データベースを作成");
  });

  await run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  console.log("booksテーブルを作成");

  try {
    await run(db, "INSERT INTO book(title) VALUES('JavaScriptの本')");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`エラー発生: ${err.message}`);
    } else {
      throw err;
    }
  }
  try {
    await get(db, "SELECT * FROM books WHERE notitle = true");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`エラー発生: ${err.message}`);
    } else {
      throw err;
    }
  }
  await run(db, "DROP TABLE books");
  console.log("booksテーブルを削除しました");

  await close(db);
}

main();
