const { getDatabase } = require("./database.service");
const { requestMapper } = require("../mappers/swift.mapper");

const querySwift = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

const getSwiftService = async (query) => {
  const db = getDatabase();
  const { columns, limit, offset, order } = requestMapper(query);

  console.log("limit", limit);
  const sql = `SELECT ${columns} FROM swift${
    order ? ` ORDER BY ${order}` : ""
  }${limit ? ` LIMIT ${limit} OFFSET ${offset}` : ""};`;

  const response = await querySwift(db, sql);

  db.close();
  return response;
};

module.exports = {
  getSwiftService,
};
