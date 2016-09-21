
module.exports = (function() {

	require('dotenv').config();

	var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;		// move to settings, drop right into .connect (settings.dbUrl)
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	var database;

	var connect = function(callback) {
		MongoClient.connect(url, function( err, db ) {
			assert.equal(null, err);
			//console.log("Connected to database");
			database = db;
		});
	};

	var connection = function() {
		return database;
	};

	return {
		connect: function(callback) {
			connect(callback);
		},
		connection: function() {
			return connection();
		}
	};
})()