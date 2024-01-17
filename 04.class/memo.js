import { Database } from "./database.js";

class Memo {
  constructor() {
    this.db = new Database();
  }

  async create(content) {
    const recordId = await this.db.create(content);
    console.log(`作成したレコードのidは${recordId}です`);
  }

  async list() {
    try {
      const memos = await this.db.index();
      if (memos) {
        memos.forEach((memo) => {
          console.log(memo.id, memo.content);
        });
      } else {
        console.log("メモはまだありません。");
      }
    } catch (err) {
      console.error(`エラー発生: ${err.message}`);
    }
  }

  async show() {
    try {
      const memo = await this.db.show(1);
      if (memo) {
        console.log(memo.content);
      } else {
        console.log("指定されたIDのメモは存在しません。");
      }
    } catch (err) {
      console.error(`エラー発生: ${err.message}`);
    }
  }

  async destroy() {
    try {
      const deletedRows = await this.db.destroy(1);
      if (deletedRows > 0) {
        console.log(`メモが削除されました。`);
      } else {
        console.log("指定されたIDのメモは存在しません。");
      }
    } catch (err) {
      console.error(`エラー発生: ${err.message}`);
    }
  }
}
const memo = new Memo();
memo.list();
memo.destroy();
