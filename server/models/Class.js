'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	var collection;

	database.connect(function(db) {
		//var db = database.connection();
		collection = db.collection('lisd_class');
		// DEV
		//console.log("Class model connected to db...");
	});
	
	var addDocument = function(data, callback) {

		var doc = { 
			courseInfo: { 
				name: data.className, 
				number: data.courseNumber, 
				instructor: data.instructor, 
				quarter: data.quarter, 
				date: new Date(data.date) 
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

		try {
			// Insert the document
		    collection.insertOne(doc, function(err, result) {
			    if(err) {
			    	console.log("Error: " + err);
			    	callback({status: 'error', message: err});
			    }
			    else {
			    	console.log("DB Insert OK");
			    	callback({status: "ok", message: 'Inserted 1 document into the collection', data: result});
			    }
			    // db.close();
			});
		} catch (e) {
			callback({status: 'error', message: e});
		};
		//db.close();
	}

	/* 
	* Return object of all available class property choices for libnrarian, location, and department
	*/
	var getList = function(callback) {
		var classes = [];

		try {
			var cursor = collection.find({}, {"_id": 1, "courseInfo.name": 1});
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		classes.push(item);
	        	}
	        	else {
	        		callback({status: "ok", message: "Ok", data: classes});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getList: function(callback) {
			getList(callback);
		}
	};
})()