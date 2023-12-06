import sqlite3 from "sqlite3";
import { run, get } from "./databaseFunctions.js";

const promise = new Promise((resolve, reject) => {
  const db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(db);
    }
  });
});

promise
  .then((db) => {
    console.log("データベースを作成");
    return run(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
  })
  .then(({ db }) => {
    console.log("booksテーブルを作成");
    return run(db, "INSERT INTO books(title) VALUES('JavaScriptの本')");
  })
  .then(({ db, lastID }) => {
    console.log(`作成したレコードは${lastID}です`);
    return get(db, "SELECT * FROM books WHERE rowid");
  })
  .then(({ db, row }) => {
    console.log(`idは${row.id}です`);
    return run(db, "DROP TABLE books");
  })
  .then(({ db }) => {
    console.log("booksテーブルを削除しました");
    db.close();
  })
  .catch((err) => {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  });
