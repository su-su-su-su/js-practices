import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("データベースを作成");
});

db.run(
  "create table books(id integer primary key autoincrement, title text not null unique)",
  (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("booksテーブルを作成");

    db.run("insert into books(title) values('Javascriptの本')", (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log(`作成したidは${this.lastID}です`);

      db.get("select * from books where rowid", (err, row) => {
        if (err) {
          console.log(err.message);
        }
        console.log(`idは${row.id}です`);

        db.run("drop table books", (err) => {
          if (err) {
            console.log(err.message);
          }
          console.log("booksテーブルを削除しました");
        });
        db.close();
      });
    });
  }
);
