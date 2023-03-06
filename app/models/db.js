const mysql = require("mysql");
const configuration = require('../config/environment/configuration.js');

var connection = mysql.createConnection({
    host: configuration.MYSQL.HOST,
    user: configuration.MYSQL.USER,
    password: configuration.MYSQL.PASSWORD,
    database: configuration.MYSQL.DB
})

module.exports = connection;