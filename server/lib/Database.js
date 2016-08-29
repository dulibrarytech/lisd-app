'use strict';

var mysql = require('mysql');

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

exports.connection = connection;

exports.queryDB = function(query, callback) {

	connection.query(query, function (error, results, fields) {
	  if(error) {
		console.log("Database error: " + error);
		callback(error);
	  }
	  else {
	  	callback(results); 
	  }
	});
}
