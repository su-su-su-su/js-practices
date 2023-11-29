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
      "create table books(id integer primary key autoincrement, title text not null unique)"
    );
  })
  .then(({ db }) => {
    console.log("booksテーブルを作成");
    return run(db, "insert into book(title) values('Javascriptの本')");
  })
  .then(({ db, err }) => {
    if (err) {
      console.error("エラー発生:", err.message);
    }
    return get(db, "select * from books where notitle");
  })
  .then(({ db, err }) => {
    if (err) {
      console.error("エラー発生:", err.message);
    }
    return run(db, "drop table books");
  })
  .then(({ db }) => {
    console.log("booksテーブルを削除しました");
    db.close();
  })
  .catch((err) => {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  });
