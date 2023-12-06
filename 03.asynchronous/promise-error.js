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
    return run(db, "INSERT INTO book(title) VALUES('JavaScriptの本')");
  })
  .then(({ db, err }) => {
    if (err) {
      console.error("エラー発生:", err.message);
    }
    return get(db, "SELECT * FROM books WHERE notitle");
  })
  .then(({ db, err }) => {
    if (err) {
      console.error("エラー発生:", err.message);
    }
    return run(db, "DROP TABLE books");
  })
  .then(({ db }) => {
    console.log("booksテーブルを削除しました");
    db.close();
  })
  .catch((err) => {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  });
