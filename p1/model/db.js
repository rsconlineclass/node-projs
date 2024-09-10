const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'ram',
    password:'Ramesh123!',
    database:'website'
});

module.exports = pool.promise();