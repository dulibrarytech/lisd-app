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
	//console.log('Connected to db: ' + url);
});

var getStudentTotals = function() {

}

var getDepartmentTotals = function() {
	
}

// ...

exports.getAllData = function(data,callback) {

	// Use above functions, in any config.
	var queries = [getStudentTotals,getDepartmentTotals];

	var collection = database.collection('lisd_class');
    var responseData = [];

	collection.find({}).toArray(function(err, docs) {

	    assert.equal(err, null);


	    // Build main return doc here
	    // ...
	    callback(docs);
	});
}