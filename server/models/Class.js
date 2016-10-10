'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	database.connect();

	var addDocument = function(data, callback) {

		//var doc = {}; // prod
		var db = database.connection();
		var collection = db.collection('lisd_class');

		// Build db document from data
		var doc = {
			courseInfo: { 
		          className: data.className,
		          courseNumber: data.courseNumber,
		          instructor: data.instructor,
		          date: new Date(data.date),
		          quarter: data.quarter,
		    },
		    enrollmentInfo: {
		          undergraduates: data.undergraduates,
		          graduates: data.graduates,
		          faculty: data.faculty,
		          other: data.other
		    },
		    associatedLibrarians: data.associatedLibrarians,
		    location: data.location,
		    department: data.department,
		    type: data.type,
		    acrlFrame: data.acrlFrame,
		    comments: data.comments
		};

		console.log("doc formed: " + doc.courseInfo.className);

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
		db.close();
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		}
	};
})()