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

  const { lastID } = await run(
    db,
    "INSERT INTO books(title) VALUES('JavaScriptの本')"
  );
  console.log(`作成したレコードのidは${lastID}です`);

  const row = await get(db, `SELECT * FROM books WHERE id = ${lastID}`);
  console.log(`titleは${row.title}です`);

  await run(db, "DROP TABLE books");
  console.log("booksテーブルを削除しました");

  await close(db);
}

main();
