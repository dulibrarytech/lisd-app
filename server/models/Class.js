'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	database.connect();

	var addDocument = function(data, callback) {

		var doc = {}; // prod
		var db = database.connection();
		var collection = db.collection('lisd_class');

		// Build db document from data
		doc = data; // DEV

		// Update date to date format
		var date = new Date(doc.courseInfo.dateCreated);
		doc.courseInfo.dateCreated = date;

		try {
			// Insert the document
		    collection.insertOne(doc, function(err, result) {
			    if(err) {
			    	callback({status: 'error', message: err});
			    }
			    else {
			    	callback({status: 'ok', message: 'Inserted 1 document into the collection', data: result});
			    }
			});
		} catch (e) {
			callback({status: 'error', message: e});
		};
		// db.close();
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		}
	};
})()