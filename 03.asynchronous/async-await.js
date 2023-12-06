import sqlite3 from "sqlite3";
import { run, get } from "./databaseFunctions.js";

async function main() {
  try {
    const db = new sqlite3.Database(":memory:");
    console.log("データベースを作成");

    await run(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
    console.log("booksテーブルを作成");

    const { lastID } = await run(
      db,
      "INSERT INTO books(title) VALUES('JavaScriptの本')"
    );
    console.log(`作成したレコードは${lastID}です`);

    const { row } = await get(db, `SELECT * FROM books WHERE id = ${lastID}`);
    console.log(`idは${row.id}です`);

    await run(db, "DROP TABLE books");
    console.log("booksテーブルを削除しました");

    db.close();
  } catch (err) {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  }
}

main();
