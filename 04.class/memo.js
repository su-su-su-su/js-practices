import { Database } from "./database.js";

export class Memo {
  constructor() {
    this.db = new Database();
  }

  async init() {
    await this.db.createTable();
  }

  async create(content) {
    const recordId = await this.db.create(content);
    console.log(`作成したレコードのidは${recordId}です`);
  }

  async list() {
    try {
      const memos = await this.db.index();
      if (memos.length > 0) {
        return memos.map((memo) => `${memo.id}: ${memo.content}`);
      } else {
        console.log("メモはまだありません。");
        return [];
      }
    } catch (err) {
      console.error(`エラー発生: ${err.message}`);
      return [];
    }
  }

  async view(id) {
    try {
      const memo = await this.db.show(id);
      if (memo) {
        console.log(memo.content);
      } else {
        console.log("指定されたIDのメモは存在しません。");
      }
    } catch (err) {
      console.error(`エラー発生: ${err.message}`);
    }
  }

  async delete(id) {
    try {
      const memo = await this.db.destroy(id);
      if (memo > 0) {
        console.log(`メモが削除されました。`);
      } else {
        console.log("指定されたIDのメモは存在しません。");
      }
    } catch (err) {
      console.error(`エラー発生: ${err.message}`);
    }
  }
}
