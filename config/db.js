require("dotenv").config();
const mysql = require("mysql");
const db_config = {
    host: process.env.DB_HOST || "localhost", // host for connection
    port: process.env.DB_PORT || 3306, // default port for mysql is 3306
    database: process.env.DB_DATABASE || "demo_crud", // database from which we want to connect out node application
    user: process.env.DB_USER || "root", // username of the mysql connection
    password: process.env.DB_PASSWORD || "" // password of the mysql connection
}
const dbConn = mysql.createConnection(db_config);

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("connection created with Mysql successfully");
});

module.exports = dbConn;