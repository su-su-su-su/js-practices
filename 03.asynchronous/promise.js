import sqlite3 from "sqlite3";
import { run, get, close } from "./database-functions.js";

const db = new sqlite3.Database(":memory:", () => {
  console.log("データベースを作成");
});

run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => {
    console.log("booksテーブルを作成");
    return run(db, "INSERT INTO books(title) VALUES('JavaScriptの本')");
  })
  .then((result) => {
    console.log(`作成したレコードのidは${result.lastID}です`);
    return get(db, "SELECT * FROM books");
  })
  .then((row) => {
    console.log(`titleは${row.title}です`);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("booksテーブルを削除しました");
    return close(db);
  });
