import sqlite3 from "sqlite3";

export class Database {
  constructor() {
    this.sqliteDb = new sqlite3.Database("./memo.db");
  }

  async createTable() {
    await this.run(
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)"
    );
  }

  async create(content) {
    const result = await this.run("INSERT INTO memos(content) VALUES(?)", [
      content,
    ]);
    return result.lastID;
  }

  async index() {
    return await this.all("SELECT * FROM memos");
  }

  async show(id) {
    const memo = await this.get("SELECT * FROM memos WHERE id = ?", [id]);
    return memo;
  }

  async destroy(id) {
    const result = await this.run("DELETE FROM memos WHERE id = ?", [id]);
    return result.changes;
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.sqliteDb.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.sqliteDb.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  all(sql) {
    return new Promise((resolve, reject) => {
      this.sqliteDb.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
