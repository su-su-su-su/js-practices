import sqlite3 from "sqlite3";
import { run, get } from "./database-functions.js";

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.log(err.message);
  }
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
    console.log(`作成したレコード${result.lastID}はです`);
    return get(db, "SELECT * FROM books");
  })
  .then((row) => {
    console.log(`idは${row.id}です`);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("booksテーブルを削除しました");
    db.close();
  })
  .catch((err) => {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  });
