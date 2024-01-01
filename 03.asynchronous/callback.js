import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  console.log("データベースを作成");
});

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("booksテーブルを作成");

    db.run("INSERT INTO books(title) VALUES('JavaScriptの本')", function () {
      console.log(`作成したレコードのidは${this.lastID}です`);

      db.get("SELECT * FROM books", (err, row) => {
        console.log(`titleは${row.title}です`);

        db.run("DROP TABLE books", () => {
          console.log("booksテーブルを削除しました");
          db.close();
        });
      });
    });
  }
);
