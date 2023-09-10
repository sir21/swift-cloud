const { getDatabase } = require('./database.service');
const { validateColumns } = require('../validators/swift.validator');
const { columnMapper } = require('../mappers/swift.mapper');

const querySwift = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

const getSwiftService = async (query) => {
  const db = getDatabase();
  if (!validateColumns(query.columns)) {
    throw new Error('Invalid column params');
  }
  const column = columnMapper(query.columns);

  const sql = `SELECT ${column} FROM swift;`;
  const response = await querySwift(db, sql);
  console.log(response);

  db.close();
  return response;
}

module.exports = {
  getSwiftService,
}
