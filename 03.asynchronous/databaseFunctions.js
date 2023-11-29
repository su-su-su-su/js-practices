export function run(db, sql) {
  return new Promise((resolve) => {
    db.run(sql, function (err) {
      if (err) {
        resolve({ db, err });
      } else {
        resolve({ db, lastID: this.lastID });
      }
    });
  });
}

export function get(db, sql) {
  return new Promise((resolve) => {
    db.get(sql, (err, row) => {
      resolve({ db, err, row });
    });
  });
}
