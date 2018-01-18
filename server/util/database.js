
module.exports = (function() {

	require('dotenv').config();

	var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	var database;

	var connect = function(callback) {
		MongoClient.connect(url, function( err, db ) {
			assert.equal(null, err);
			database = db;

			if(callback) {
				callback(db);
			}
			
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