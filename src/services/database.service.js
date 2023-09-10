const fs = require("fs");
const { parse } = require("csv-parse");
const sqlite3 = require("sqlite3").verbose();

const csvFilePath = `${process.cwd()}/src/database/swift-cloud.csv`;
const dbFilePath = `${process.cwd()}/src/database/db.js`;


/**
 * Create table for data import
 * @param {*} db 
 */
const createTable = (db) => {
  db.exec(`
    CREATE TABLE swift
      (
        song            VARCHAR(50),
        artist          VARCHAR(100),
        writer          VARCHAR(100),
        album           VARCHAR(50),
        year            INT,
        plays_june      INT,
        plays_july      INT,
        plays_august    INT
      );
`);
};

/**
 * Read CSV file and upload to sql db
 * @param {*} db 
 */
const readCsv = (db) => {
  fs.createReadStream(csvFilePath)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    db.serialize(function () {
      db.run(
        `INSERT INTO swift VALUES (?, ?, ? , ?, ?, ?, ?, ?)`,
        [row[0], row[1], row[2], row[3], +row[4], +row[5], +row[6], +row[7]],
        function (error) {
          if (error) {
            return console.log(error.message);
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      );
    });
  })
  .on("error", function (error) {
    console.error(error.message);
  });
}

/**
 * Create Database with table
 * @returns Database
 */
const connectToDatabase = () => {
  if (fs.existsSync(dbFilePath)) {
    return new sqlite3.Database(dbFilePath);
  } else {
    const db = new sqlite3.Database(dbFilePath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

/**
 * Get database
 * @returns Database
 */
const getDatabase = () => {
    if(fs.existsSync(dbFilePath)) {
        return new sqlite3.Database(dbFilePath);
    }
    return null;
}

/**
 * DB Initialization
 */
const initiateDatabase = () => {
  console.log("DB Initiate started");
  const db = connectToDatabase();
  readCsv(db);
};

module.exports = {
  initiateDatabase,
  getDatabase,
};
