import sqlite3 from "sqlite3";

const promise = new Promise((resolve, reject) => {
  const db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(db);
    }
  });
});

export function run(db, sql) {
  return new Promise((resolve) => {
    db.run(sql, function (err) {
      if (err) {
        resolve({ db, err });
      } else {
        resolve({ db });
      }
    });
  });
}

export function get(db, sql) {
  return new Promise((resolve) => {
    db.get(sql, (err) => {
      if (err) {
        resolve({ db, err });
      } else {
        resolve({ db });
      }
    });
  });
}

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
    console.error("エラー発生:", err.message);
    return get(db, "select * from books where notitle");
  })
  .then(({ db, err }) => {
    console.error("エラー発生:", err.message);
    return run(db, "drop table books");
  })
  .then(({ db }) => {
    console.log("booksテーブルを削除しました");
    db.close();
  });
