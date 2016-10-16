'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	var collection;

	database.connect(function(db) {
		//var db = database.connection();
		collection = db.collection('lisd_librarian');
		// DEV
		console.log("Librarian model connected to db...");
	});
	
	var addDocument = function(data, callback) {

	};

	var getList = function(callback) {

	};

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getList: function(callback) {
			getList(callback);
		}
	};
})()