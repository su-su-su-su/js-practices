import sqlite3 from "sqlite3";
import { run, get } from "./databaseFunctions.js";

async function main() {
  try {
    const db = new sqlite3.Database(":memory:");
    console.log("データベースを作成");

    await run(
      db,
      "create table books(id integer primary key autoincrement, title text not null unique)"
    );
    console.log("booksテーブルを作成");

    const { err: runErr } = await run(
      db,
      "insert into book(title) values('Javascriptの本')"
    );
    if (runErr) console.error("エラー発生:", runErr.message);

    const { err: getErr } = await get(db, "select * from books where notitle");
    if (getErr) console.error("エラー発生:", getErr.message);

    await run(db, "drop table books");
    console.log("booksテーブルを削除しました");

    db.close();
  } catch (err) {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  }
}

main();
