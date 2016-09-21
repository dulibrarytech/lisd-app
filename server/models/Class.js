'use strict'

module.exports = (function() {

	var database;
	var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  database = db;
	});

	var addDocument = function(doc, callback) {

		var collection = database.collection('lisd_class');

		// Update date to date format
		var date = new Date(doc.courseInfo.dateCreated);
		doc.courseInfo.dateCreated = date;

		try {
			// Insert the document
		    collection.insertOne(doc, function(err, result) {
			    assert.equal(err, null);
			    callback({status: 'ok', message: 'Inserted 1 document into the collection'});
			});
		} catch (e) {
			callback({status: 'error', message: e});
		};
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		}
	};
})()