import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  console.log("データベースを作成");
});

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("booksテーブルを作成");

    db.run("INSERT INTO books(title) VALUES('JavaScriptの本')", (err) => {
      if (err) {
        console.error(err.message);
      }

      db.get("SELECT * FROM books WHERE notitle", (err) => {
        if (err) {
          console.error(err.message);
        }

        db.run("DROP TABLE books", () => {
          console.log("booksテーブルを削除しました");
        });
        db.close();
      });
    });
  }
);
