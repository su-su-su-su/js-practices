import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  console.log("データベースを作成");
});

db.run(
  "create table books(id integer primary key autoincrement, title text not null unique)",
  () => {
    console.log("booksテーブルを作成");

    db.run("insert into book(title) values('Javascriptの本')", (err) => {
      if (err) {
        console.error(err.message);
      }

      db.get("select * from books where notitle", (err) => {
        if (err) {
          console.error(err.message);
        }

        db.run("drop table books", () => {
          console.log("booksテーブルを削除しました");
        });
        db.close();
      });
    });
  }
);
