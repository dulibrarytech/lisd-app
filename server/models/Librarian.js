'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	database.connect();
	
	var addDocument = function(data, callback) {

		var db = database.connection();
		var collection = db.collection('lisd_librarian');
	};

	var getLibrarians = function(callback) {

	};

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getLibrarians: function(callback) {
			getLibrarians(callback);
		}
	};
})()