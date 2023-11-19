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

function run(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ db, lastID: this.lastID });
      }
    });
  });
}

function get(db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve({ db, row });
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
    return run(db, "insert into books(title) values('Javascriptの本')");
  })
  .then(({ db, lastID }) => {
    console.log(`作成したidは${lastID}です`);
    return get(db, "select * from books where rowid");
  })
  .then(({ db, row }) => {
    console.log(`idは${row.id}です`);
    return db;
  })
  .then((db) => {
    return run(db, "drop table books");
  })
  .then(({ db }) => {
    console.log("booksテーブルを削除しました");
    db.close();
  })
  .catch((err) => {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  });
