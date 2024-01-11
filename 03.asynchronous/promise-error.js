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

    return run(db, "INSERT INTO book(title) VALUES('JavaScriptの本')");
  })
  .catch((err) => {
    console.error(`エラー発生: ${err.message}`);

    return get(db, "SELECT * FROM books WHERE notitle");
  })
  .catch((err) => {
    console.error(`エラー発生: ${err.message}`);

    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("booksテーブルを削除しました");

    return close(db);
  });
