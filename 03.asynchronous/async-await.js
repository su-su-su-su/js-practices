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

    const { lastID } = await run(
      db,
      "insert into books(title) values('Javascriptの本')"
    );
    console.log(`作成したidは${lastID}です`);

    const { row } = await get(db, `select * from books where id = ${lastID}`);
    console.log(`idは${row.id}です`);

    await run(db, "drop table books");
    console.log("booksテーブルを削除しました");

    db.close();
  } catch (err) {
    console.error("データベース操作中にエラーが発生しました:", err.message);
  }
}

main();
