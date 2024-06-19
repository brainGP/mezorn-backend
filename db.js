const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const { HOST, SQL_USER, DB_NAME, SQL_PORT } = process.env;

const connection = mysql.createConnection({
  host: HOST,
  user: SQL_USER,
  database: DB_NAME,
  port: SQL_PORT,
});

const connectDB = async () => {
  connection.connect((err) => {
    if (err) {
      console.log("Error connecting to MySQL: " + err.stack);
      return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
  });
};

module.exports = connectDB;
