import { MemoRepository } from "./database.js";

export class Memo {
  constructor() {
    this.db = new MemoRepository();
  }

  async init() {
    await this.db.createTable();
  }

  async write(content) {
    const recordId = await this.db.create(content);
    console.log(`作成したレコードのidは${recordId}です`);
  }

  async readAll() {
    try {
      const memos = await this.db.loadAll();
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

  async read(id) {
    try {
      const memo = await this.db.load(id);
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
