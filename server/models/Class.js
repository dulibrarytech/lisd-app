'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	database.connect();

	var addDocument = function(data, callback) {

		console.log("data in:");
		console.log(data);

		//var doc = {}; // prod
		var db = database.connection();
		var collection = db.collection('lisd_class');

		// Build db document from data
		// var doc = {
		// 	courseInfo: { 
		//           name: data.className,
		//           number: data.courseNumber,
		//           instructor: data.instructor,
		//           quarter: data.quarter,
		//           date: new Date("2000-10-10")
		//     },
		//     enrollmentInfo: {
		//           undergraduates: data.undergraduates,
		//           graduates: data.graduates,
		//           faculty: data.faculty,
		//           other: data.other
		//     },
		//     associatedLibrarians: data.associatedLibrarians,
		//     location: data.location,
		//     department: data.department,
		//     type: data.type,
		//     acrlFrame: data.acrlFrame,
		//     comments: data.comments
		// };
		console.log("THTH");
		console.log(typeof data.associatedLibrarians[0]);

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
			    	callback({status: 'ok', message: 'Inserted 1 document into the collection', data: result});
			    }
			    // db.close();
			});
		} catch (e) {
			callback({status: 'error', message: e});
		};
		//db.close();
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		}
	};
})()