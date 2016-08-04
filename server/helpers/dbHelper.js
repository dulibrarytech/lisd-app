'use strict';

var mysql = require('mysql')

var db = {

	connection : mysql.createConnection({
	  host: dbInfo.host,
	  user: dbInfo.user,
	  password: dbInfo.pass,
	  database: dbInfo.database
	})

};

db.connection.connect(function(err) {
	  if (err) throw err
	  console.log('You are now connected...')
})

module.exports = db;

