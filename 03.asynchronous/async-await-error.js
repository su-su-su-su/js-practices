import sqlite3 from "sqlite3";
import { run, get } from "./database-functions.js";

async function main() {
  try {
    const db = new sqlite3.Database(":memory:");
    console.log("データベースを作成");

    await run(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
    console.log("booksテーブルを作成");

    const { err: runErr } = await run(
      db,
      "INSERT INTO book(title) VALUES('JavaScriptの本')"
    );
    if (runErr) console.error("エラー発生:", runErr.message);

    const { err: getErr } = await get(db, "SELECT * FROM books WHERE notitle");
    if (getErr) console.error("エラー発生:", getErr.message);

    await run(db, "DROP TABLE books");
    console.log("booksテーブルを削除しました");

    db.close();
  } catch (err) {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  }
}

main();
