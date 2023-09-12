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
  const { columns, limit, offset, orderString, search, newColumns } =
    requestMapper(query);

  const sql = `SELECT ${columns}${
    newColumns ? `,${newColumns}` : ""
  } FROM swift${search ? ` WHERE ${search}` : ""}${
    orderString ? ` ORDER BY ${orderString}` : ""
  }${limit ? ` LIMIT ${limit} OFFSET ${offset * limit}` : ""};`;

  const response = await querySwift(db, sql);

  db.close();
  return response;
};

module.exports = {
  getSwiftService,
};
