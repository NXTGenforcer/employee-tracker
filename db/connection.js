const mysql = require("mysql2");
const util = require("util");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Gskywalker17!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

connection.query = util.promisify(connection.query);

module.exports = connection;
