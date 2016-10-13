'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	database.connect();
	
	var addDocument = function(data, callback) {

		var db = database.connection();
		var collection = db.collection('lisd_location');
	};

	var getLocations = function(callback) {

	};

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getLocations: function(callback) {
			getLocations(callback);
		}
	};
})()