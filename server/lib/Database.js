'use strict';

var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
	  if (err) throw err
	  console.log('You are now connected...');
	
})

module.exports = connection;
