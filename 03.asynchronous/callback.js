import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("データベースを作成");
});

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("booksテーブルを作成");

    db.run("INSERT INTO books(title) VALUES('Javascriptの本')", (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log(`作成したidは${this.lastID}です`);

      db.get("SELECT * FROM books WHERE rowid", (err, row) => {
        if (err) {
          console.log(err.message);
        }
        console.log(`idは${row.id}です`);

        db.run("DROP TABLE books", (err) => {
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
