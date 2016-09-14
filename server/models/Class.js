'use strict'

'use strict'

require('dotenv').config();

var settings = require("../config/settings.js");
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var database;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
//var url = 'mongodb://localhost:27017/lisddb_development';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	database = db;
	console.log('Connected to db: ' + url);
});

exports.addDocument = function(doc) {

	// Insert the document
}